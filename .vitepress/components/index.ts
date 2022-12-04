/*
 * @Author: shen
 * @Date: 2022-12-02 10:51:43
 * @LastEditors: shen
 * @LastEditTime: 2022-12-04 18:34:08
 * @Description:
 */
import type { Component } from 'vue'
import Home from './Home/index.vue'
import Demo from './Demo/index.vue'

export const globals: [string, Component][] = [
	['Home', Home],
	['Demo', Demo]
]
