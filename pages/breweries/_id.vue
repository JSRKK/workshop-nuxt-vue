<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
        <v-img
          class="white--text align-end"
          aspect-ratio="1"
          max-width="600"
          max-height="480"
          style="border-radius: 4px"
          :src="photoUrl"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
      <div class="col">
        <p class="headline">{{ data.name }}</p>
        <div>
          <span class="font-weight-bold">Brewery type:</span>
          <span> {{ data.brewery_type }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Street:</span>
          <span>{{ data.street }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">City:</span>
          <span>{{ data.city }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">State:</span>
          <span>{{ data.state }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Postal code:</span>
          <span>{{ data.postal_code }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Country:</span>
          <span>{{ data.country }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Longitude:</span>
          <span>{{ data.longitude }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Latitude:</span>
          <span>{{ data.latitude }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Phone:</span>
          <span>{{ data.phone }}</span>
        </div>
        <div class="mt-2">
          <span class="font-weight-bold">Website url:</span>
          <span>{{ data.website_url }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import breweriesApi from '@/server/api/breweries'

export default {
  asyncData(ctx) {
    return breweriesApi
      .getBreweries(ctx.route.params.id)
      .then((res) => ({ data: res.data }))
  },
  data() {
    return {
      data: null
    }
  },
  computed: {
    photoUrl() {
      const seed = Math.floor(Math.random() * Math.floor(100))
      return `https://picsum.photos/id/${seed}/600/480?blur=1`
    }
  }
}
</script>
