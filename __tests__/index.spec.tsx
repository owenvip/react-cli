describe('Index', () => {
  it('mount without crashing', () => {
    const mount = () => {
      const div = document.createElement('div')
      div.id = 'root'
      document.body.appendChild(div)
      require('@/')
    }

    expect(mount).not.toThrowError()
  })
})
