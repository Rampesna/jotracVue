<template>

</template>

<script lang="ts">

import {
    encrypt,
    decrypt
} from "@/core/helpers/crypto";

export default {
    methods: {

    },
    mounted() {
        let encrypted = encrypt("Talha Can", "jotrac");
        let decrypted = decrypt(encrypted, "jotrac");

        console.log(encrypted);
        console.log(decrypted);
    },
    setup() {

    }
}
</script>
<style>

</style>
