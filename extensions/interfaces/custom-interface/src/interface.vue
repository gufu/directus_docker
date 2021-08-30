<template>
  <h1>Test222</h1>
  <input :value="value" @input="handleChange($event.target.value)" />
</template>

<script>
export default {
  emits: ['input'],
  props: {
    value: String,
  },
  methods: {
    handleChange(value) {
      this.$emit('input', value);
    },
  },
};
</script>
