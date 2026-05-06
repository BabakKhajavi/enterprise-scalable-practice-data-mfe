import 'dotenv/config';
import { fileURLToPath } from 'url';
import path from 'path';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    port: 9003,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    hot: true,
    open: false,
  },
  output: {
    publicPath: 'auto',
    library: { type: 'window', name: 'enterprise-scalable-practice-data' },
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      { test: /\.(ts|tsx|js)$/, exclude: /node_modules/, use: 'babel-loader' },
    ],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'enterprise-scalable-practice-data',
      filename: 'remoteEntry.js',
      exposes: {
        './Store': './src/store/index.ts',
        './AuthApi': './src/api/auth/auth-api-slice.ts',
        './BrandApi': './src/api/brand/brand-api-slice.ts',
        './Auth': './src/events/auth-stream.ts',
        './Brand': './src/events/brand-stream.ts',
      },
      shared: {
        react: {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.x',
        },
        'react-dom': {
          singleton: true,
          strictVersion: true,
          requiredVersion: '19.2.x',
        },
        'react-router-dom': { singleton: true, requiredVersion: '7.x.x' },
        'react-redux': { singleton: true, requiredVersion: '9.x.x' },
        '@reduxjs/toolkit': { singleton: true, requiredVersion: '2.x.x' },
        '@mui/material': { singleton: true, requiredVersion: '7.x.x' },
        '@mui/system': { singleton: true, requiredVersion: '7.x.x' },
        '@emotion/react': { singleton: true, requiredVersion: '11.x.x' },
        '@emotion/styled': { singleton: true, requiredVersion: '11.x.x' },
        rxjs: { singleton: true, requiredVersion: '7.x.x' },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
};
