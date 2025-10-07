<template>
    <div>
        <Header />
        <main>
            <slot />
        </main>
        <Footer />
    </div>
</template>

<script>
    import Header from '../components/Landing/CompHeader.vue'
    import Footer from '../components/Landing/CompFooter.vue'

    export default {
        components: {
            Header,
            Footer
        }
    }
</script>