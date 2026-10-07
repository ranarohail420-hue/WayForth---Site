const { defineConfig, devices } = require('@playwright/test');
module.exports=defineConfig({testDir:'./tests',use:{baseURL:'http://127.0.0.1:4173'},projects:[{name:'desktop',use:{...devices['Desktop Chrome']}},{name:'iphone',use:{...devices['iPhone 15']}}]});
