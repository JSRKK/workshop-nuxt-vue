<template>
  <div>
    <v-hover v-slot:default="{ hover }" open-delay="100">
      <v-card
        :elevation="hover ? 16 : 2"
        :aspect-ratio="16 / 9"
        max-width="300"
        height="100%"
        :nuxt="true"
        :to="{ name: 'breweries-id', params: { id: data.id } }"
      >
        <v-img
          class="white--text align-end"
          height="180"
          :src="photoUrl"
          gradient="to top right, rgba(0,0,0,.2), rgba(0,0,0,.3)"
        >
          <v-card-title>{{ data.name || '-' }}</v-card-title>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-card-subtitle class="pb-0">{{ data.street || '-' }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>{{ data.city || '-' }}</div>

          <div>{{ data.state || '-' }}</div>
        </v-card-text>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    photoUrl() {
      const seed = Math.floor(Math.random() * Math.floor(100))
      return `https://picsum.photos/id/${seed}/300/300`
    }
  }
}
</script>

<style></style>
