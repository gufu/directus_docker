export const addSimpleStorage = (editor, that) => {
    const storage = editor.StorageManager
    storage.add('simple-storage', {
        load(keys, clb, clbErr) {
            const result = {}
            if (that.value) {
                const parsed = JSON.parse(that.value)
                keys.forEach(key => {
                    const value = parsed[key]
                    if (value) {
                        result[key] = value
                    }
                })
                clb(result)
            }
        },
        store(data, clb, clbErr) {
            that.value = data
            that.$emit('input', data)
            clb()
        }
    })
}