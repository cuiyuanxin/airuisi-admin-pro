import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean, prodMock: boolean) {
  const mockPlugin = viteMockServe({
    ignore: /^_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild && prodMock,
    watchFiles: true,
    injectCode: `
      import { setupProdMockServer } from '../mock/createProdMockServer'
      setupProdMockServer()
      `,
  })

  return mockPlugin
}
