import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean, prodMock: boolean) {
  const mockPlugin = viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    watchFiles: true,
    localEnabled: !isBuild,
    prodEnabled: isBuild && prodMock,
    injectCode: `
      import { setupProdMockServer } from '../mock/createProdMockServer'
      setupProdMockServer()
      `,
  })

  return mockPlugin
}
