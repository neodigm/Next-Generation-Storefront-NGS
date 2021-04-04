<script> 
import { mapState, mapActions } from 'vuex'
import { omit, difference } from 'lodash-es'

const tabsHeight = 48
const tableFooterHeight = 59
const headerSearchHeight = 66

export default {
  name: 'GraphTable',
  components: {},
  props: {
    showExploreView: {
      type: Boolean
    },
    graphContainerCardHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tab: 0,
      searchNodes: '',
      searchEdges: '',
      selectedNodesInTable: [],
      selectedEdgesInTable: [],
      dataTableHeight: 0,
      oCSVConfig: {},
      jnCSV: "",
      sCSV: "",
      blCSV: "",
      elCSV: ""
    }
  },
  computed: mapState({
    selectedNodesInGraph: (state) => {
      return state.cyberGraph.selectedNodes.map((p) => p.id)
    },
    selectedEdgesInGraph: (state) => {
      return state.cyberGraph.selectedEdges.map((p) => p.id)
    },
    hiddenNodesIds: (state) => {
      return state.cyberGraph.hiddenNodesIds
    },
    loading: (state) => {
      return state.cyberGraph.loading.isLoading
    },
    edges: (state) => {
      return state.cyberGraph.elements.edges.map((p) => {
        return p.data
      })
    },
    nodes: (state) => {
      return state.cyberGraph.elements.nodes.map((p) => {
        return {
          "NoI": p.data.isOfInterestNode,
          id: p.data.data.objectsid,
          label: p.data.label,
          "edges in": p.data.data.t_inEdgeCount,
          "edges out": p.data.data.t_outEdgeCount,
          ...omit(p.data.data, [
            't_edgeCount',
            't_perEdgeCount',
          ])
        }
      })
    },
    currentNOI: (state) => state.cyberGraph.nodesOfInterest
  }),
  watch: {
    showExploreView() {
      const containerHeight = this.showExploreView
        ? this.graphContainerCardHeight / 2
        : this.graphContainerCardHeight
      this.dataTableHeight = this.computeTableHeight(containerHeight)
    },
    selectedNodesInGraph: {
      deep: true,
      immediate: true,
      handler: function(ids) {
        this.selectedNodesInTable = this.nodes.filter((p) => ids.includes(p.id))
      }
    },
    selectedEdgesInGraph: {
      deep: true,
      immediate: true,
      handler: function(ids) {
        this.selectedEdgesInTable = this.edges.filter((p) => ids.includes(p.id))
      }
    },
    selectedNodesInTable(nodes) {
      const selectedNodesIdsInTable = nodes.map((p) => p.id)
      if (
        selectedNodesIdsInTable.length !== this.selectedNodesInGraph.length ||
        difference(selectedNodesIdsInTable, this.selectedNodesInGraph).length
      ) {
        const selectedNodesInTable = nodes.map((p) => {
          return { id: p.id, label: p.label }
        })
        this.setSelectedNodes(selectedNodesInTable)
      }
    },
    selectedEdgesInTable(edges) {
      const selectedEdgesIdsInTable = edges.map((p) => p.id)
      if (
        selectedEdgesIdsInTable.length !== this.selectedEdgesInGraph.length ||
        difference(selectedEdgesIdsInTable, this.selectedEdgesInGraph).length
      ) {
        const selectedEdgesInTable = edges.map((p) => {
          return { id: p.id, label: p.label }
        })
        this.setSelectedEdges(selectedEdgesInTable)
      }
    }
  },
  methods: {
    ...mapActions({
      toggleNodeVisibility: 'cyberGraph/toggleNodeVisibility',
      setSelectedNodes: 'cyberGraph/setSelectedNodes',
      setSelectedEdges: 'cyberGraph/setSelectedEdges',
      setNodesOfInterest: 'cyberGraph/setNodesOfInterest'
    }),
    onResize() {
      this.dataTableHeight = this.computeTableHeight(
        (this.$refs.containerDiv.parentElement.clientHeight - 48)
      )
    },
    computeTableHeight(containerHeight) {
      return (
        containerHeight - tabsHeight - tableFooterHeight - headerSearchHeight
      ) // reduce height to take the size of the container.
    },
    createTableHeaders(){
          return [
            {
            text: "Id",
            align: 'start', sortable: true,
            value: "objectsid"
            },
            {
            text: "Label",
            align: 'start', sortable: true,
            value: "label"
            },
            {
            text: "Name",
            align: 'start', sortable: true,
            value: "name"
            },
            {
            text: "Edges In",
            align: 'end', sortable: true,
            value: "edges in"
            },
            {
            text: "Edges Out",
            align: 'end', sortable: true,
            value: "edges out"
            },
            { text: "Nodes of Interest", value: "NoI", sortable: true },
            {
            text: "Reference Id",
            align: 'start', sortable: true,
            value: "id"
            }
          ];
    },
    isNOI(nId) {
      return this.currentNOI ? this.currentNOI.find((e) => e.id === nId) : []
    },
    toggleNodesOfInterest(item) {
      const payload = {
        id: item.id,
        name: item.name,
        nodeType: item.nodeType
      }
      this.setNodesOfInterest(payload)
    },
    initCSV( _oCSVConfig ){
        this.oCSVConfig = _oCSVConfig;
        if( this.oCSVConfig.fileName.indexOf("####") !== -1){
          this.oCSVConfig.fileName = this.oCSVConfig.fileName.replace("####", Date.now() );
        }
        this.jnCSV = this.sCSV = this.blCSV = this.elCSV = "";
    },
    setCSVArray( _jnCSV ){ //  An array (rows) of arrays (cols) !jagged
      this.jnCSV = _jnCSV;
      if( this.oCSVConfig.header ) this.jnCSV.unshift( this.oCSVConfig.header );
      this.jnCSV.forEach(( aRow )=>{
          aRow.forEach(( aCol )=>{
              this.sCSV += this.oCSVConfig.delimQuote + aCol;
              this.sCSV += this.oCSVConfig.delimQuote + this.oCSVConfig.delimCol;
          });
          this.sCSV += this.oCSVConfig.delimLine;
      });
    },
    getCSVBlob(){
      this.blCSV = new Blob([ this.sCSV ], { type: "text/csv;charset=utf-8;" });
    },
    createCSVLink(){
        this.elCSV = document.createElement("a");
        this.elCSV.setAttribute("href", URL.createObjectURL( this.blCSV ));
        this.elCSV.setAttribute("download", this.oCSVConfig.fileName );
        this.elCSV.style.visibility = "hidden";
        document.body.appendChild( this.elCSV );
    },
    clickCSVLink(){
      this.elCSV.click();
    },
    removeCSVLink(){
      document.body.removeChild( this.elCSV );
    }
  }
}
</script>

<template>
  <div
    ref="containerDiv"
    v-resize="onResize"
    :class="$style.drawer"
    :style="{ height: showExploreView ? '50%' : '100%' }" 
  >
    <v-tabs v-model="tab" :centered="false" background-color="transparent">
      <v-tab>
        Nodes List
      </v-tab>
      <v-tab>
        Edges List
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item>

        <v-data-table
          v-if="nodes.length"
          v-model="selectedNodesInTable"
          :search="searchNodes"
          :options= "{ 'itemsPerPage': 20 }"
          :footer-props="{
            'items-per-page-options': [5, 10, 20, 100]
          }"
          :headers="createTableHeaders()"
          :items="nodes"
          :loading="loading"
          item-key="id"
          fixed-header dense
          :height="dataTableHeight"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-card>
              <v-card-title>
                <div class="subtitle-1">
                {{ nodes.length }} nodes
                </div>
                <v-spacer></v-spacer>
                <v-icon size="16">far fa-search</v-icon>
                <v-text-field
                  v-model="searchNodes"
                  label="Search"
                  class="mx-4"
                ></v-text-field>

                <v-btn
                  class="ml-2"
                  color="primary"
                  outlined
                  rounded
                  @click="showColumnFilter = true"
                >
                  <v-icon left size="16">
                    far fa-line-columns
                  </v-icon>COLUMNS
                </v-btn>

                <v-btn
                  class="ml-2"
                  color="primary"
                  aria-label="Export table to csv"
                  icon
                  :loading=false
                  :disabled=false
                  @click="exportData = 9"
                >
                  <v-icon>
                    far fa-arrow-to-bottom
                  </v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </template>

          <template v-slot:item.NoI="{ item }" >
              <v-btn
                icon
                color="primary"
                @click="toggleNodesOfInterest(item)"
              >
                <v-icon v-if="!isNOI(item.id)" size="16">far fa-star</v-icon>
                <v-icon v-if="isNOI(item.id)" size="16">fas fa-star</v-icon>
              </v-btn>
          </template>

        </v-data-table>
        <div v-if="!nodes.length" class="pa-4 text--secondary">No data</div>
      </v-tab-item>

      <v-tab-item>
        <v-data-table
          v-if="edges.length"
          v-model="selectedEdgesInTable"
          :headers="
            Object.keys(edges[0]).map((p) => {
              return {
                text: p,
                align: 'start',
                sortable: true,
                value: p
              }
            })
          "
          :search="searchEdges"
          :options= "{ 'itemsPerPage': 20 }"
          :footer-props="{
            'items-per-page-options': [5, 10, 20, 100]
          }"
          :items="edges"
          :loading="loading"
          item-key="id"
          fixed-header dense
          :height="dataTableHeight"
          class="elevation-0"
        >
          <template v-slot:top>
            <v-card>
              <v-card-title>
                <div class="subtitle-1">
                {{ edges.length }} edges
                </div>
                <v-spacer></v-spacer>
                <v-icon size="16">far fa-search</v-icon>
                <v-text-field
                  v-model="searchEdges"
                  label="Search"
                  class="mx-4"
                ></v-text-field>

                <v-btn
                  class="ml-2"
                  color="primary"
                  outlined
                  rounded
                  @click="showColumnFilter = true"
                >
                  <v-icon left size="16">
                    far fa-line-columns
                  </v-icon>COLUMNS
                </v-btn>

                <v-btn
                  class="ml-2"
                  color="primary"
                  aria-label="Export table to csv"
                  icon
                  :loading=false
                  :disabled=false
                  @click="exportData = 9"
                >
                  <v-icon>
                    far fa-arrow-to-bottom
                  </v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </template>
        </v-data-table>
        <div v-if="!edges.length" class="pa-4 text--secondary">No data</div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style module lang="scss">
@import '@design';

.drawer {
  box-shadow: 0 -3px 5px rgba(0, 0, 0, 0.25);
}
.visibilityIcon {
  cursor: pointer;
}
.searchNOIcont {
  width: 90%;
}
.searchNOIbtn {
  position: absolute;
  top: 14px;
  right: 12px;
}
</style>
