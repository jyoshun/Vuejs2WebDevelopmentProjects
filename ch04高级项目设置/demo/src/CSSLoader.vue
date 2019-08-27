<template>
  <article class="article">
    <h1 class="title">Title</h1>
  </article>
</template>

<style scoped>
.title {
  color: blue;
}
</style>

<style lang="sass" scoped>
// .article
//   .title
//     border-bottom: solid 3px rgba(red, .2)
</style>

<style lang="less" scoped>
// .article {
//   .title {
//     border-bottom: solid 3px fade(red, 20%);
//   }
// }
</style>

<style lang="stylus" scoped>
.article
  .title
    border-bottom solid 3px rgba(red, .2)
</style>
