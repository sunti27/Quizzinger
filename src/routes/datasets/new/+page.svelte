<script>
    import { SlideToggle } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
    import { toastStore } from '@skeletonlabs/skeleton';
    import { modalStore } from '@skeletonlabs/skeleton';

    export let data;

    const { form, errors, constraints, enhance, message } = superForm(data.form, {
		applyAction: true,
		invalidateAll: true,
		resetForm: true,
		defaultValidator: 'clear',
        dataType: 'json',
	});

    function addItem() {
        $form.items = [...$form.items, { question: '', answer: '' }];
    }

    /** @param {number} idx */
    function removeItem(idx) {
        /** @type {import('@skeletonlabs/skeleton').ModalSettings} */
        const confirm = {
            type: 'confirm',
            title: 'Remove item',
            body: 'Are you sure you want to remove this item?',
            response: (yes) => {
                if (yes) {
                    $form.items = $form.items.filter((_, i) => i !== idx);
                }
            },
        }

        modalStore.trigger(confirm);
    }

    $: $message && toastStore.trigger({
        message: $message,
        background: 'variant-filled-success',
    });
</script>

<form method="POST" class="flex flex-col mx-auto my-12 w-11/12 sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl justify-center gap-4" use:enhance>
    <div class="flex items-center justify-between gap-4">
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
            <SlideToggle class="data-invalid" label="description" name="is_public" bind:checked={$form.is_public} size="lg" rounded="rounded" active="bg-success-400-500-token" />
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
            data-invalid={$errors.desc}
            bind:value={$form.desc}
            {...$constraints.desc}
            />
    </div>
    {#each $form.items as _, idx}
        <div class="w-full h-fit grid grid-cols-[8fr_auto] md:grid-cols-[4fr_4fr_auto] grid-rows-2 md:grid-rows-1 gap-2">
            <label class="label" for="question">
                <input
                    class="input"
                    class:input-error={$errors.items?.[idx]?.question}
                    type="text"
                    name="question"
                    placeholder="Question #{idx+1}"
                    bind:value={$form.items[idx].question}
                    {...$constraints.items}
                />
                {#if $errors.items?.[idx]?.question}
                    <span>{$errors.items[idx].question}</span>
                {/if}
            </label>
            <label class="label row-start-2 md:row-start-1" for="answer">
                <input
                    class="input"
                    class:input-error={$errors.items?.[idx]?.answer}
                    type="text"
                    name="answer"
                    placeholder="Answer #{idx+1}"
                    bind:value={$form.items[idx].answer}
                    {...$constraints.items}
                />
                {#if $errors.items?.[idx]?.answer}
                    <span>{$errors.items[idx].answer}</span>
                {/if}
            </label>
            <button type="button" class="btn-icon btn variant-soft-error h-full md:h-auto rounded row-span-2" on:click={() => removeItem(idx)}>
                <i class="fas fa-trash" />
            </button>
        </div>
    {/each}
    <div class="flex justify-between items-center">
        <button type="button" class="btn-icon variant-filled-primary" on:click={addItem}>
            <i class="fas fa-plus" />
        </button>
        <button type="submit" class="btn variant-filled-primary">Create</button>
    </div>
</form>
