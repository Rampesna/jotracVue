<template>

    <Heading :encrypted-id="this.encryptedId"></Heading>

</template>

<script lang="ts">


import Heading from "@/views/modules/project/components/Heading.vue";
import md5 from "md5";
import {decrypt} from "@/core/helpers/crypto";
import {getToken} from "@/core/services/JwtService";
import ProjectService from "@/services/ProjectService";

export default {
    props: {
        encryptedId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            projectId: null,
        }
    },
    mounted() {
        // @ts-ignore
        this.projectId = decrypt(this.encryptedId, md5(getToken()));

    },
    components: {
        Heading
    },
    setup() {
        return {
            getToken,
            md5
        }
    }
}
</script>
<style>

</style>
