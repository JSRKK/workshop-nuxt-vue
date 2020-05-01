<template>
  <div>
    <div v-if="isLoading">
      <loading />
    </div>
    <div v-else>
      <v-autocomplete
        v-model="data"
        :items="items"
        :loading="searching"
        :search-input.sync="search"
        color="white"
        hide-no-data
        hide-selected
        item-text="name"
        item-value="id"
        label="Search"
        placeholder="Search breweries"
        prepend-icon="fa-search"
        return-object
      >
      </v-autocomplete>
      <v-row>
        <v-col v-for="item in breweries" :key="item.id" md="3">
          <card-view :data="item"></card-view>
        </v-col>
      </v-row>
      <div>
        <v-pagination
          v-model="page"
          :length="total_page"
          :total-visible="6"
          circle
        ></v-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import CardView from '@/components/CardView'

import breweriesApi from '@/server/api/breweries'
export default {
  async fetch() {
    this.isLoading = true
    const res = await breweriesApi.fetchBreweries({ page: 1 })
    this.isLoading = false

    this.breweries = res.data
  },
  components: {
    Loading,
    CardView
  },
  data: () => ({
    descriptionLimit: 60,
    autocomplete: [],
    isLoading: false,
    searching: false,
    data: null,
    search: null,
    breweries: [],
    page: 1,
    total_page: 20
  }),
  computed: {
    items() {
      return this.autocomplete.map((data) => {
        const name =
          data.name.length > this.descriptionLimit
            ? data.name.slice(0, this.descriptionLimit) + '...'
            : data.name

        return Object.assign({}, data, { name })
      })
    }
  },
  watch: {
    search(val) {
      if (this.items.length > 0) return

      if (this.searching) return

      this.searching = true

      breweriesApi
        .searchBreweries(val)
        .then((res) => {
          this.autocomplete = res.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.searching = false))
    },
    data(val) {
      this.$router.push({ name: 'breweries-id', params: { id: val.id } })
    },
    page(val) {
      this.isLoading = true
      breweriesApi
        .fetchBreweries({ page: val })
        .then((res) => {
          console.log(res.data)
          this.breweries = res.data
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style></style>
