<script>
    import { createEventDispatcher, onDestroy } from 'svelte';

    const dispatch = createEventDispatcher();
    const close = () => dispatch('close');

    let help;

    const handle_keydown = e => {
        if (e.key === 'Escape') {
            close();
            return;
        }

        if (e.key === 'Tab') {
            // trap focus
            const nodes = help.querySelectorAll('*');
            const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;

            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;

            tabbable[index].focus();
            e.preventDefault();
        }
    };

    const previously_focused = typeof document !== 'undefined' && document.activeElement;

    if (previously_focused) {
        onDestroy(() => {
            previously_focused.focus();
        });
    }
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="help-background" on:click={close}></div>

<div class="help" role="dialog" aria-modal="true" bind:this={help}>
    <slot name="header"></slot>
    <hr>
    <slot name="rules"></slot>
    <hr>
    <button class = "but" on:click={close}>Закрыть</button>
</div>

<style>
    @media screen and (max-width: 3900px) {
        .but:focus
        {
            box-shadow: #f60d0d 0 0 20px;
        }
        .help-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }

        .help {
            margin-top: -15%;
            position: absolute;
            left: 50%;
            top: 0px;
            width: 3000px;
            max-height: calc(85vh - 5em);
            overflow: auto;
            transform: translate(-50%, -50%);
            background: lemonchiffon;
            z-index: 12;
            border-radius: 6px;
            box-shadow: lemonchiffon 0 0 20px;
        }
        .but {
            margin-top: 25px;
            margin-left: 25px;
            width: 600px;
            height: 165px;
            font-size: 80px;
        }
    }
    @media screen and (max-width: 2050px) {
        .but:focus {
            box-shadow: #f60d0d 0 0 20px;
        }
        .help-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }

        .help {
            margin-top: -20%;
            position: absolute;
            left: 50%;
            top: 100px;
            width: 1700px;
            max-height: calc(85vh - 5em);
            overflow: auto;
            transform: translate(-50%, -50%);
            background: lemonchiffon;
            z-index: 12;
            border-radius: 6px;
            box-shadow: lemonchiffon 0 0 20px;
        }
        .but {
            margin-top: 5px;
            margin-left: 25px;
            width: 300px;
            height: 80px;
            font-size: 40px;
        }
    }
    @media screen and (max-width: 1300px) {
        .but:focus {
            box-shadow: #f60d0d 0 0 20px;
        }
        .help-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        .help {
            margin-top: -22%;
            position: absolute;
            left: 50%;
            top: 100px;
            width: 1000px;
            max-height: calc(85vh - 5em) + 100px;
            overflow: auto;
            transform: translate(-50%, -50%);
            background: lemonchiffon;
            z-index: 12;
            border-radius: 6px;
            box-shadow: lemonchiffon 0 0 20px;
            margin-right: 5%;
        }
        .but {
            margin-top: 5px;
            margin-left: 25px;
            width: 200px;
            height: 35px;
            font-size: 20px;
        }
    }
    @media screen and (max-width: 1000px) and (max-height: 1400px) {
        .but:focus {
            box-shadow: #f60d0d 0 0 20px;
        }
        .help-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
        }
        .help {
            margin-top: -22%;
            position: absolute;
            left: 50%;
            top: 100px;
            width: 100%;
            max-height: calc(85vh - 5em) + 100px;
            overflow: auto;
            transform: translate(-50%, -50%);
            background: lemonchiffon;
            z-index: 12;
            border-radius: 6px;
            box-shadow: lemonchiffon 0 0 20px;
            margin-right: 5%;
        }
        .but {
            margin-top: 5px;
            margin-left: 25px;
            width: 200px;
            height: 35px;
            font-size: 20px;
        }
    }

    @media screen and (max-width: 500px) and (max-height: 1000px) {

    }

    @media screen and (max-width: 400px) and (max-height: 700px) {

    }
</style>