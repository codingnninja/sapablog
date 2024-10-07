export function formToJSON(form, options = {}) {
    const config = {
        includeDisabled: false,
        trimValues: true,
        skipEmpty: false,
        ...options
    };

    const formElement = typeof form === 'string' 
        ? document.querySelector(form) 
        : form;

    if (!(formElement instanceof HTMLFormElement)) {
        throw new Error('Invalid form element');
    }

    const formData = new FormData(formElement);
    const result = {};

    for (const [key, value] of formData.entries()) {
        const input = formElement.querySelector(`[name="${key}"]`);
        
        if (!input) continue;

        if (!config.includeDisabled && input.disabled) continue;

        if (config.skipEmpty && !value) continue;

        let processedValue = processInputValue(input, value, config);
        
        if (processedValue === undefined) continue;

        setNestedValue(result, key, processedValue);
    }

    return result;
}

function processInputValue(input, value, config) {
    const type = input.type?.toLowerCase();

    switch (type) {
        case 'number':
        case 'range':
            return value === '' ? null : Number(value);

        case 'checkbox':
            return input.checked;

        case 'radio':
            return input.checked ? value : undefined;

        case 'file':
            return input.multiple 
                ? Array.from(input.files)
                : input.files[0] || null;

        case 'select-multiple':
            return Array.from(input.selectedOptions).map(option => option.value);

        case 'date':
        case 'datetime-local':
            return value ? new Date(value).toISOString() : null;

        default:
            return config.trimValues ? value.trim() : value;
    }
}

function setNestedValue(obj, path, value) {

    const normalizedPath = path.replace(/\[(\w+)\]/g, '.$1');
    const keys = normalizedPath.split('.');
    
    let current = obj;
    
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        
        if (i === keys.length - 1) {
            current[key] = value;
        } else {
            if (!(key in current)) {
                const nextKey = keys[i + 1];
                current[key] = /^\d+$/.test(nextKey) ? [] : {};
            }
            current = current[key];
        }
    }
}