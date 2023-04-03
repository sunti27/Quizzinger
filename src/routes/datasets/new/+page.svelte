<script>
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
    import { SlideToggle } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';

	const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 300),
        easing: cubicInOut,
	});

    export let data;

    const { form, errors, constraints } = superForm(data.form, {
		applyAction: false,
		invalidateAll: true,
		resetForm: false,
		defaultValidator: 'clear',
	});

  import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';

</script>

<SuperDebug data={$form} />

<form class="flex flex-col mx-auto my-12 max-w-[50%] justify-center gap-4">
    <div class="flex items-center justify-between">
        <label class="label">
            <span>Title</span>
            <input
                class="input"
                class:input-error={$errors.title}
                type="text"
                name="title"
                placeholder="Title"
                data-invalid={$errors.title}
                bind:value={$form.title}
                {...$constraints.title}
                />
        </label>
        <label class="label flex flex-col" for="is_public">
            <span>Is public?</span>
            <SlideToggle class="data-invalid" label="description" name="is_public" bind:checked={$form.is_public} size="lg" rounded="rounded" active="bg-success-200-700-token" />
        </label>
    </div>
    <div>
        <label class="label" for="desc">Description</label>
        <input
            class="input"
            class:input-error={$errors.desc}
            type="text"
            name="desc"
            placeholder="Description"
            bind:value={$form.desc}
            {...$constraints.desc}
            />
    </div>
    <!-- <div class="relative">
        {#key wrap}
            <div class="flex justify-center gap-x-4 w-full absolute" id="hi" class:flex-col={wrap}>
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
    </div> -->
    <button type="submit" class="btn variant-filled-primary ml-auto">Create</button>
</form>
