const uploadFile = async(e) => {
    const that = this
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    const formData = new FormData();
    const file = files[0]
    delete file.metadata
    formData.append('title', file.name);
    formData.append('file', file);
    //TODO: handle credentials to upload/fetch files
    await fetch('/files?access_token=secret', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            try {
                return response.json()
            } catch (e) {
                return {}
            }
        })
        .then(response => {
            console.log('uploadFile response: ', response.data)
            that.addAssetsToList([].push(response.data))
        })
}

export const assetUploadHandler = (editor) => {
    const assetManager = editor.AssetManager
    assetManager.uploadFile = uploadFile

    /* CALLBACKS */
    // editor.on('asset:upload:end', async (response) => {
    //   console.log('asset:upload:end: ', response)
    // })

    // editor.on('asset:add', async (response) => {
    //   console.log('asset:add: ', response)
    // })
}
