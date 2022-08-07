import PicGo from 'picgo'
import { IConfig } from 'picgo/dist/src/types';
import { createClient } from "webdav";

const config = (ctx: PicGo) => {
  //let config = ctx.getConfig('transformer.webdav') || ctx.getConfig('picgo-plugin-webdav')
  const prompts = [{
    name: "uri",
    type: "input",
    message: 'webdav 服务器 url',
    required: true
  },
  {
    name: "username",
    type: "input",
    message: 'webdav 服务器 用户名',
    required: true
  },

  {
    name: "password",
    type: "input",
    message: 'webdav 服务器 密码',
    required: true
  },
  {
    name: "upload_floder_path",
    type: "input",
    message: 'webdav服务器上传所至文件夹路径',
    default: "/",
    required: false
  },
  ]
  return prompts
}

const handle = async (ctx: PicGo) => {
  const config: IConfig = ctx.getConfig("uploader.webdav") || ctx.getConfig("picgo-plugin-webdav")
  const client = createClient(
    config?.uri,
    {
      username: config?.username,
      password: config?.password,
    }
  );
    ctx.log.info("连接webdav服务器成功")
  let picObjArray = ctx.output
  for (let picObj of picObjArray) {
    let picBuffer = picObj.buffer
    await client.putFileContents(config?.upload_folder_path + picObj.fileName, picBuffer, { overwrite: true })
    ctx.log.info(`上传图片${picObj.fileName}成功`)
    picObj.imgUrl = client.getFileDownloadLink(config?.upload_folder_path + picObj.fileName)
  }

  return ctx
}


export = (ctx: PicGo) => {
  const register = () => {
    ctx.helper.uploader.register('webdav', {
      handle,
    })

  }
  return {
    uploader: 'webdav',
    register,
    config: config,
  }
}
