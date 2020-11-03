<script>
    export let address;

    let addressText = () => {
        if(address === undefined) {
            return "Create Account";
        } else {
            return address;
        }
    }
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div>
        {addressText()}
    </div>
</nav>