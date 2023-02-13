// serve para lidar com manipulacao de arquivos
const fs = require('fs');
// serve para lidar com os diretórios
const path = require('path');
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file){
    // essa  funcao de rename, serve para mudar o arquivo de lugar, estamos levando ela da pasta temporaria para a pasta definitiva
    await fs.promises.rename(
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )
    return file
  }

  async deleteFile(file){
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)

    try {
      await fs.promises.stat(filePath)
    } catch (error) {
      return
    }

    await fs.promises.unlink(filePath)
  }
}

module.exports = DiskStorage