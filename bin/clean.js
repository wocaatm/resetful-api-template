// 清除dist文件夹
const shelljs = require('shelljs');
const path = require('path');

shelljs.rm('-rf', path.resolve(__dirname, '../dist'));