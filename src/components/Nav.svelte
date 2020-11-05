<script>
    export let address;
    import { onMount, afterUpdate } from 'svelte'

    onMount(() => {
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {
            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {
                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const targetA = document.getElementById(target);
                    
                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    targetA.classList.toggle('is-active');
                });
            });
        }
    });

    afterUpdate(() => {
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger.is-active,.navbar-menu.is-active'), 0);
        if ($navbarBurgers.length > 0) {
            $navbarBurgers.forEach(el => {
                el.classList.toggle('is-active');
            });
        }
    });
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="">
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
            <a class="navbar-item">
                Create Vote
            </a>

            <a class="navbar-item">
                Documentation
            </a>
        </div>

        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-primary">
                        <strong>{address !== undefined ? address : 'Create Wallet'}</strong>
                    </a>
                    <a class="button is-light">
                        {address !== undefined ? 'Log out' : 'Log in'}
                    </a>
                </div>
            </div>
        </div>
    </div>
</nav>