module.exports = (n = 10) => {
  let urls = [];
  for (let i = 0; i < n; i++) {
    urls.push({
      link: `/post/${Date.now}`,
      priority: parseInt(Math.random()*10)/10,
      updateFrequency: 'daily',
      modifiedAt: new Date(new Date().getTime() + parseInt(Math.abs(Math.random()*1000)**2)),
      mobile: true,
    })
  }
  return urls;
}
