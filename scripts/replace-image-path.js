hexo.extend.filter.register('before_post_render', function(data) {
  data.content = data.content.replace(/\.\.\/images\//g, 'images/');
  return data;
});
