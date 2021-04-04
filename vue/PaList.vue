<script>
import { Types } from '@apis/admon-legacy/v1-api.js'
import { mapGetters } from 'vuex'
import { get, head, has, isEmpty, pick } from 'lodash-es'
import appConfig from '@src/app.config'
import PageHeader from '@components/PageHeader'
import paginationMixin from '@mixins/_pagination-mixin.js'
import {
  getPaList,
  exportPaData,
  getPaListV3,
  exportPaDataV3
} from '@apis/admon-legacy'
import { createAndDownloadBlob } from '@utils/download'
import PaFilterDrawer from '@components/PaFilterDrawer'
import FilterDrawerGroup from '@components/FilterDrawerGroup'
import FilterDrawer from '@components/FilterDrawer'
import QAlert from '@components/QAlert'
import PaListDeltaChips from '@components/PaListDeltaChips'
import DetailsDrawerContent from '@components/PaDrawerDetails.vue'
import {
  getDefaultDateFilter,
  createColumns,
  formatResultsData,
  getTrustDirection,
  handleDateRangeAssignments,
  buildCustomRange,
  formatDate
} from '@utils/pa-list-utils'
import * as fetchAndUpdate from '@utils/fetch-and-update'

export default {
  components: {
    PageHeader,
    FilterDrawer,
    FilterDrawerGroup,
    PaFilterDrawer,
    QAlert,
    PaListDeltaChips,
    DetailsDrawerContent
  },
  metaInfo: {
    titleTemplate: '%s | CYBER | Trends List',
    meta: [{ name: 'description', content: appConfig.description }]
  },

  mixins: [paginationMixin],
  props: {
    obsId: {
      type: String,
      required: true
    },
    hostname: {
      type: String,
      required: true
    },
    domain: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    delta: {
      type: String,
      required: true
    },
    search: {
      type: String,
      required: true
    },
    columns: {
      type: [Array, String],
      required: true
    },
    pwdLastChanged: {
      type: Array,
      required: true
    },
    accLastLogin: {
      type: Array,
      required: true
    },
    pagination: {
      // contains the fields from
      // the table
      type: Object,
      required: true
    },
    hasDelta: Boolean,
    hasActions: Boolean,
    filteringDisabled: Boolean,
    csvExportDisabled: Boolean,
    title: {
      type: String,
      default: ''
    },
    detailsView: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      routes: [
        {
          text: 'Privilege Assurance',
          to: {
            name: 'pa-home',
            params: { obsId: this.obsId },
            query: {
              hostname: this.hostname,
              domain: this.domain || undefined
            }
          },
          exact: true
        },
        {
          text: `${this.title} List`,
          disabled: true
        }
      ],
      initialFetch: false,
      initialPageLoad: true,
      tableItems: fetchAndUpdate.defaultData({
        results: [],
        columns: [],
        resultCount: 0
      }),
      selectedRow: {},
      csvData: fetchAndUpdate.defaultData({}),
      searchHeadersQuery: '',
      showDateFilter: false,
      showColumnFilter: false,
      showDetailsPanel: false,
      showFilterColumns: false,
      filterColumnsMeta: [
        {"title": "Overall Risk","criterion": ["High", "Medium", "Low"]},
        {"title": "Domain Admin Exposure","criterion": ["High", "Low"]},
        {"title": "Password Follows Best Practices","criterion": ["Likely", "Unlikely"]},
        {"title": "AS-Rep Roasting","criterion": ["High", "Low"]}
      ],
      defaultDateFilter: getDefaultDateFilter(),
      filterDate: {
        // When page refreshes, we want to initialize this prop
        // with the values from the url
        pwdLastChanged: {
          ...getDefaultDateFilter().pwdLastChanged,
          ...handleDateRangeAssignments(this.pwdLastChanged)
        },
        accLastLogin: {
          ...getDefaultDateFilter().accLastLogin,
          ...handleDateRangeAssignments(this.accLastLogin)
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      featurePaVizEnabled: 'auth/feature_pa_viz',
      featurePa: 'auth/feature_pa'
    }),

    janusType() {
      return Types.get(this.type) || undefined
    },

    hasGraph() {
      return [
        'ous',
        'domains',
        'gpos',
        'computers',
        'groups',
        'users'
      ].includes(this.type)
    },

    formattedTitle() {
      return `${this.tableItems.data.resultCount} ${this.title} `
    },

    filteredTableHeaders() {
      return this.tableItems.data.columns
        .filter(({ visible }) => visible)
        .concat([{ text: '', value: 'actions', sortable: false }])
    },

    firstHeaderItem() {
      return this.hasActions && this.filteredTableHeaders[0]
        ? get(this.filteredTableHeaders, '[0].name', 'NO_ACTION_AVAILABLE')
        : 'NO_ACTION_AVAILABLE'
    },
    firstHeaderItemSlotName() {
      return `item.${this.firstHeaderItem}`
    },

    dateFilterCount() {
      return [this.pwdLastChanged, this.accLastLogin].reduce(
        (acc, i) => (i.length ? acc + 1 : acc),
        0
      )
    },

    filterColumnsCount() {
      return 5; // TODO
    },

    searchColumnsToFilter() {
      if (this.searchHeadersQuery) {
        return this.tableItems.data.columns.filter((header) =>
          header.value
            .toLowerCase()
            .includes(this.searchHeadersQuery.toLowerCase())
        )
      }

      return this.tableItems.data.columns
    },

    hasDateFiltering() {
      return this.tableItems.data.columns.some((i) =>
        ['pwdLastSet', 'lastLogon'].includes(i.name)
      )
    },

    hasFilterColumns() {
      return true; // TODO
    },

    usesV3Endpoint() {
      return ['members', 'notAdminMachineCreation'].includes(this.type)
    },

    disableGraphBtn() {
      return this.delta === 'Removed'
    }
  },
  watch: {
    '$route.query': {
      immediate: false,
      handler: function(val) {
        this.getPaData()
      }
    }
  },

  mounted() {
    this.initialFetch = true
    this.getPaData()
  },

  methods: {
    buildRequestObject() {
      const { limit, offset } = this.paginateRequest({
        page: this.pagination.page,
        itemsPerPage: this.pagination.itemsPerPage
      })

      const show = this.columns.length ? ['id', ...this.columns] : undefined

      const sortByField =
        has(this.pagination, 'sortBy') && !isEmpty(this.pagination.sortBy)

      const sort = sortByField
        ? {
            columnName: head(this.pagination.sortBy),
            order: head(this.pagination.sortDesc) ? 'Desc' : 'Asc'
          }
        : undefined

      const pwdLastChanged = this.pwdLastChanged.length
        ? {
            start: this.pwdLastChanged[0],
            end: this.pwdLastChanged[1]
          }
        : undefined

      const accLastLogin = this.accLastLogin.length
        ? {
            start: this.accLastLogin[0],
            end: this.accLastLogin[1]
          }
        : undefined

      return {
        obsId: this.obsId,
        hostname: this.hostname,
        type: this.type,
        token: this.$store.state.auth.token,
        limit: limit,
        offset: offset,
        delta: this.delta === 'total' ? undefined : this.delta,
        domain: this.domain || undefined,
        show,
        sort,
        pwdLastChanged,
        accLastLogin,
        search: this.search || undefined
      }
    },

    getPaData: fetchAndUpdate.createHandler('tableItems', async function() {
      this.initialFetch = false
      const reqObj = this.buildRequestObject()

      const {
        data: { columns, results, resultCount }
      } = await Promise.resolve().then(() => {
        if (this.usesV3Endpoint) return getPaListV3(reqObj)
        return getPaList(reqObj)
      })

      let invalidNames = [
        'id',
        'Id',
        'objectSid',
        'aces',
        'groupId',
        'groupsId'
      ]
      if (this.type === 'members')
        invalidNames = invalidNames.concat([
          'timestamp',
          'hostName',
          'userId',
          'groupSid'
        ])
      if (this.type === 'shadowAdmins')
        invalidNames = invalidNames.concat(['aceType', 'rightName'])
      const columnsFilteringActive = !!this.columns.length
      return {
        columns: columns
          .filter((i) => !invalidNames.includes(i.name))
          .map(createColumns)
          .map((i) => {
            if (columnsFilteringActive) {
              i.visible = this.columns.includes(i.name)
            }
            return i
          }),
        results: results.map(formatResultsData),
        resultCount: resultCount || 0
      }
    }),

    exportData: fetchAndUpdate.createHandler('csvData', async function() {
      const reqObj = this.buildRequestObject()
      const { data } = await Promise.resolve().then(() => {
        if (this.usesV3Endpoint) return exportPaDataV3(reqObj)
        return exportPaData(reqObj)
      })

      createAndDownloadBlob(
        data,
        'text/csv;charset=utf-8;',
        `${this.hostname}_${this.type}.csv`
      )

      return {}
    }),

    // append query params like show to the route URL
    updateRouteColumnFilter() {
      this.$router
        .replace({
          query: {
            ...this.$route.query,
            columns: this.filteredTableHeaders
              .filter((i) => i.visible)
              .map((i) => i.name)
          }
        })
        .catch(() => {})
    },

    resetColumns() {
      this.searchHeadersQuery = ''
      this.$router
        .replace({
          query: {
            ...this.$route.query,
            columns: undefined
          }
        })
        .catch(() => {})
    },

    buildDateParams(dateFilters) {
      return Object.keys(dateFilters).reduce((acc, filter) => {
        const currentFilter = dateFilters[filter]

        if (currentFilter.dateSelection === 'all') {
          acc[filter] = undefined
          return acc
        }

        if (currentFilter.dateSelection === 'custom') {
          const orderedRange = buildCustomRange(currentFilter)
          acc[filter] = orderedRange
          return acc
        }

        // startTime is todays date in seconds minus the number of days
        // (86400 seconds per day) selected
        // TODO: update this for currentTime -> start of N day
        const days = currentFilter.dateSelection * 86400
        const today = Math.floor(Date.now() / 1000)
        acc[filter] = [today - days, today]
        return acc
      }, {})
    },

    updateRouteDateFilter(dateFilters) {
      this.$router
        .push({
          query: {
            ...this.$route.query,
            ...this.buildDateParams(dateFilters),
            page: undefined
          }
        })
        .catch(() => {})
    },

    updateQuery({ page, itemsPerPage, sortBy, sortDesc }) {
      if (this.initialPageLoad) {
        this.initialPageLoad = false
        return
      }

      this.$router
        .push({
          query: {
            ...this.$route.query,
            page,
            itemsPerPage,
            sortBy,
            sortDesc
          }
        })
        .catch(() => {})
    },

    searchList(val) {
      this.$router
        .push({
          query: {
            ...this.$route.query,
            search: val || undefined,
            page: undefined
          }
        })
        .catch(() => {})
    },

    clearSearch() {
      this.$router
        .push({
          query: { ...this.$route.query, search: undefined, page: undefined }
        })
        .catch(() => {})
    },

    formatDate(range) {
      return range.map(formatDate).join(' - ')
    },
    openDetailsPanel(v) {
      if (!this.hasActions) return
      this.selectedRow = { ...v, type: this.type }
      this.showDetailsPanel = true
    },

    toGraphId(item) {
      const { id, userId, computerId } = pick(item, [
        'id',
        'userId',
        'computerId'
      ])
      if (this.type === 'krbtgtAccounts' || this.type === 'shadowAdmins')
        return id
      return userId || computerId || id
    },
    getTrustDirection
  }
}
</script>

<template>
  <div class="pb-4">
    <page-header :routes="routes"> </page-header>
    <v-card outlined>
      <v-card-title class="pb-0">
        <h1 class="title font-weight-regular ">{{ formattedTitle }}</h1>
      </v-card-title>
      <v-row
        class="mx-4"
        :class="!hasDelta ? 'justify-lg-end' : 'justify-space-between'"
      >
        <v-col v-if="hasDelta" cols="12" lg="auto">
          <pa-list-delta-chips :delta="delta" :domain="domain" :type="type" />
        </v-col>
        <v-col cols="auto" class="d-lg-flex">
          <v-row>
            <v-col cols="8" lg="auto" class="pa-0 my-1">
              <v-text-field
                v-if="!filteringDisabled"
                :label="`Search ${title} List`"
                :value="search"
                clear-icon="far fa-times"
                clearable
                dense
                prepend-icon="far fa-search"
                @change="searchList"
                @click:clear="clearSearch"
              />
            </v-col>
            <v-col cols="12" lg="auto" class="pa-0 my-1">
              <v-badge overlap color="info" :value="!!dateFilterCount">
                <template v-slot:badge>{{ dateFilterCount }}</template>
                <v-btn
                  v-if="!filteringDisabled"
                  class="ml-2"
                  color="primary"
                  outlined
                  rounded
                  :disabled="!hasDateFiltering"
                  @click="showDateFilter = true"
                >
                  <v-icon left size="16">
                    far fa-calendar-alt
                  </v-icon>
                  FILTER DATE
                </v-btn>
              </v-badge>
            </v-col>

            <v-col cols="12" lg="auto" class="pa-0 my-1">
              <v-badge overlap color="info" :value="!!filterColumnsCount">
                <template v-slot:badge>{{ filterColumnsCount }}</template>
                <v-btn
                  v-if="!filteringDisabled"
                  class="ml-2"
                  color="primary"
                  outlined
                  rounded
                  :disabled="!hasFilterColumns"
                  @click="showFilterColumns = true"
                >
                  <v-icon left size="16">
                    far fa-filter
                  </v-icon>
                  FILTER
                </v-btn>
              </v-badge>
            </v-col>

            <v-col cols="12" lg="auto" class="pa-0 my-1">
              <v-btn
                v-if="!filteringDisabled"
                class="ml-2"
                color="primary"
                outlined
                rounded
                @click="showColumnFilter = true"
              >
                <v-icon left size="16">
                  far fa-line-columns
                </v-icon>
                SHOW/HIDE COLUMNS
              </v-btn>
            </v-col>
            <v-col cols="12" lg="auto" class="pa-0 my-1">
              <v-btn
                v-if="!csvExportDisabled"
                class="ml-2"
                color="primary"
                aria-label="Export table to csv"
                icon
                :loading="csvData.state === 'loading'"
                :disabled="tableItems.state === 'loading'"
                @click="exportData"
              >
                <v-icon>
                  far fa-arrow-to-bottom
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-data-table
        :headers="filteredTableHeaders"
        :items="tableItems.data.results"
        :loading="tableItems.state === 'loading'"
        :server-items-length="tableItems.data.resultCount"
        :disable-sort="usesV3Endpoint"
        :page="pagination.page"
        :sort-by="pagination.sortBy"
        :sort-desc="pagination.sortDesc"
        :class="hasActions ? $style.row : null"
        :items-per-page="pagination.itemsPerPage"
        :footer-props="{
          'items-per-page-options': itemsPerPageList
        }"
        @update:options="updateQuery"
        @click:row="openDetailsPanel"
      >
        <template v-slot:item.trustDirection="{ item }">
          {{ item.trustDirection }}
          <v-tooltip
            top
            max-width="250px"
            open-delay="600"
            :disabled="getTrustDirection(item).disableTooltip"
          >
            <template v-slot:activator="{ on }">
              <v-icon
                x-small
                :disabled="getTrustDirection(item).disableTooltip"
                v-on="on"
              >
                far fa-question-circle
              </v-icon>
            </template>
            <span>
              {{ getTrustDirection(item).type }} -
              {{ getTrustDirection(item).description }}
            </span>
          </v-tooltip>
        </template>

        <template v-if="featurePa" v-slot:[firstHeaderItemSlotName]="{ item }">
          <router-link
            v-if="featurePaVizEnabled && hasGraph"
            :class="['data-table__link']"
            title="graph view"
            :to="{
              name: 'pa-details-graph',
              params: {
                nodeId: item.id,
                hostname,
                type
              }
            }"
          >
            {{ item[firstHeaderItem] }}
          </router-link>
          <span v-else>{{ item[firstHeaderItem] }}</span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            v-if="featurePa && hasActions"
            :disabled="disableGraphBtn"
            icon
            color="primary"
            :aria-label="`View ${item[firstHeaderItem]} in graph`"
            :to="{
              name: 'cyber-graph',
              query: {
                hostname,
                id: toGraphId(item),
                type: janusType
              }
            }"
            @click.stop
          >
            <v-icon size="16">far fa-chart-network</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <filter-drawer
      v-model="showDateFilter"
      :default-filter="defaultDateFilter"
      :initial-filters="filterDate"
      app
      temporary
      right
      hide-overlay
      style="top: 60px;"
      height="calc(100vh - 60px)"
      width="385"
      @close-drawer="showDateFilter = false"
      @close="showDateFilter = false"
      @apply-filter="updateRouteDateFilter"
    >
      <template v-slot="{ filters }">
        <filter-drawer-group>
          <v-card v-for="(filter, key) in filters" :key="key" flat class="px-5">
            <v-subheader class="pl-0">
              {{ filter.text }}
            </v-subheader>
            <v-radio-group v-model="filter.dateSelection">
              <v-radio label="All" value="all" class="pa-0"></v-radio>
              <v-radio label="Past 7 days" value="7" class="pa-0"></v-radio>
              <v-radio label="Past 30 days" value="30" class="pa-0"></v-radio>
              <v-radio
                label="Choose date range..."
                value="custom"
                class="pa-0"
              ></v-radio>
            </v-radio-group>
            <v-menu
              :close-on-content-click="false"
              max-width="290px"
              min-width="290px"
              offset-y
              transition="scale-transition"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :disabled="filter.dateSelection !== 'custom'"
                  :persistent-hint="filter.dateSelection === 'custom'"
                  :value="formatDate(filter.range)"
                  filled
                  hint="Pick a start and end date"
                  label="Date range"
                  prepend-inner-icon="far fa-calendar"
                  readonly
                  :rules="
                    filter.dateSelection === 'custom'
                      ? [
                          () =>
                            filter.range.length === 2 ||
                            `Please select a start and end date`
                        ]
                      : []
                  "
                  @click:clear="filter.range = []"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filter.range"
                :max="new Date().toISOString().slice(0, 10)"
                color="primary"
                locale="en-in"
                no-title
                range
              ></v-date-picker>
            </v-menu>
            <v-divider></v-divider>
          </v-card>
        </filter-drawer-group>
      </template>
    </filter-drawer>

    <pa-filter-drawer
      ref="filterColumns"
      v-model="showFilterColumns"
      temporary
      disable-route-watcher
      right
      hide-overlay
      app
      style="top: 60px;"
      height="calc(100vh - 60px)"
      width="385"
      filter-title="Filter"
      @reset-filter="resetColumns"
      @close-drawer="showFilterColumns = false"
      @close="showFilterColumns = false"
    >
      <filter-drawer-group>
        <div class="mx-5">

          <p class="my-1 pb-4 info--text subtitle-3">Filter by any of the following</p>

          <v-autocomplete
            v-for="filterColumns in filterColumnsMeta"
            :key="filterColumns.title"
            xv-model="domain"
            filled
            :label="filterColumns.title"
            :items="filterColumns.criterion"
            :loading="false"
            clearable
            clear-icon="fal fa-times"
          ></v-autocomplete>

        </div>
      </filter-drawer-group>
    </pa-filter-drawer>

    <pa-filter-drawer
      ref="paColumnFilter"
      v-model="showColumnFilter"
      temporary
      disable-route-watcher
      right
      hide-overlay
      app
      style="top: 60px;"
      height="calc(100vh - 60px)"
      width="385"
      filter-title="Show/Hide Columns"
      @reset-filter="resetColumns"
      @close-drawer="showColumnFilter = false"
      @close="showColumnFilter = false"
    >
      <filter-drawer-group>
        <div class="mx-5">
          <v-text-field
            v-model="searchHeadersQuery"
            outlined
            label="Search for columns"
            prepend-inner-icon="far fa-search"
            clearable
          />

          <q-alert dismissable outlined dense color="info">
            Changes will apply upon selection
          </q-alert>

          <v-checkbox
            v-for="header in searchColumnsToFilter"
            :key="header.value"
            v-model="header.visible"
            :label="header.text"
            :disabled="header.name === firstHeaderItem"
            hide-details
            @change="updateRouteColumnFilter"
          />
        </div>
      </filter-drawer-group>
    </pa-filter-drawer>

    <v-navigation-drawer
      v-model="showDetailsPanel"
      app
      right
      temporary
      style="top: 60px;"
      height="calc(100vh - 60px)"
      width="500"
    >
      <details-drawer-content
        :row="selectedRow"
        @close-drawer="showDetailsPanel = false"
      ></details-drawer-content>
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss" module>
@import '@design';

.row {
  :global {
    tr {
      cursor: pointer !important;
    }
  }
}
</style>
