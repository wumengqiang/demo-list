module.exports = {
  apps : [{
    name        : "demo",
    script      : "./server.js",
    watch       : true,
    env: {
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }],
  deploy: {
    production: {
      user: 'wmq',
      host: ["wumengqiang.com"],
      ref: 'origin/master',
      repo: 'git@github.com:wumengqiang/demo-list.git',
      path: '/data/wmq/projects/demo-list',
      'post-deploy': 'gulp demo-info',
      env : {
        "NODE_ENV": "production"
      }
    }
  }
}
