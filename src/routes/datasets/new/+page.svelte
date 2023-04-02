<script>
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';

	const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 300),
        easing: cubicInOut,
	});

    let wrap = false;

    function checkWrap() {
        wrap = question.length > 20;
    }

    let question = '';
    let answer = '';
</script>

<form class="flex flex-col mx-auto my-12 max-w-[50%] justify-center">
    <div class="relative container">
        {#key wrap}
            <div class="flex justify-center gap-4 w-full absolute" id="hi" class:flex-col={wrap}>
                <label for="question" in:receive={{key: 1}} out:send={{key: 1}}>
                    <span class="label">Question</span>
                    <input class="input" type="text" name="question" placeholder="Why ..." on:input={checkWrap} bind:value={question} />
                </label>
                <label for="answer" in:receive={{key: 2}} out:send={{key: 2}}>
                    <span class="label">Answer</span>
                    <input class="input" type="text" name="answer" placeholder="Because ..." bind:value={answer} />
                </label>
            </div>
        {/key}
    </div>
</form>
