export function importTemplateContent(template: HTMLTemplateElement, { deep }: { deep: boolean }): DocumentFragment {
    return document.importNode(template.content, deep);
}
