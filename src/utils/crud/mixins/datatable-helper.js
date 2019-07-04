import DataTableFooter from '../components/DataTableFooter.vue'

export default {
  components: {
    DataTableFooter
  },
  data () {
    return {
      selectedStatuses: [1],
      filterColumns: [],
      tmp: '',
      search: '',
      pagination: {},
      excelLoading: false
    }
  },
  computed: {
    cleanHeaders () {
      const headers = this.tableFields.map((field) => {
        const header = {}
        header.text = field.text
        header.value = field.name.toLowerCase()
        if (field.sortable !== undefined) {
          header.sortable = field.sortable
        }
        return header
      })
      return headers
    },
    headers () {
      const actionHeader = [{
        text: this.$t('global.datatable.fields.action'),
        sortable: false
      }]
      return [...actionHeader, ...this.cleanHeaders]
    },
    statuses () {
      return [
        {
          text: this.$t('global.datatable.status.active'),
          value: 1
        },
        {
          text: this.$t('global.datatable.status.inactive'),
          value: 0
        }
      ]
    },
    filterModes () {
      return [
        {
          name: 'like',
          text: this.$t('global.datatable.filterModes.options.like')
        },
        {
          name: 'equals',
          text: this.$t('global.datatable.filterModes.options.equals')
        },
        {
          name: 'list',
          text: this.$t('global.datatable.filterModes.options.list')
        }
      ]
    }
  },
  methods: {
    updateColumnFilterMode (val, index) {
      const obj = this.filterColumns
      obj[index].mode = val
      this.$set(this, 'filterColumns', obj)
    },
    updateFilterColumns (val, index) {
      const obj = this.filterColumns
      obj[index].value = val
      this.$set(this, 'filterColumns', obj)
    },
    setPage (page) {
      this.pagination.page = parseInt(page)
    },
    clearFilters () {
      for (const column of this.filterColumns) {
        column.value = ''
      }
      this.pagination.page = 1
      this.search = ''
      this.selectedStatuses = [1]
    },
    columnTextModes (props) {
      const columnTextModes = {}
      for (const field of this.tableFields) {
        let textMode = 'cropped'
        if (field.textMode ) {
          textMode = field.textMode
        }
        else if (field.type === 'dynamic') {
          const refField = props.item[field.typeField]
          if (refField === 'file') {
            textMode = 'file'
          }
        }
        columnTextModes[field.name.toLowerCase()] = textMode
      }
      return columnTextModes
    }
  }
}
