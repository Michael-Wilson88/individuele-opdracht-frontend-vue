import { createWebHistory, createRouter } from "vue-router"
import Home from "@/views/Home.vue"
import BandDetails from "@/views/BandDetails.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/band/:code",
        name: "BandDetails",
        component: BandDetails,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router