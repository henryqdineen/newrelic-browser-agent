/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

const jil = require('../../tools/jil/driver/browser.js')

const { setup } = require('./utils/setup')
const { drain } = require('../../src/common/drain/drain')
const { Aggregate: PvtAggregate } = require('../../src/features/page_view_timing/aggregate/index')

const { agentIdentifier, aggregator } = setup()

jil.browserTest('LCP event with CLS attribute', function (t) {
  const pvtAgg = new PvtAggregate(agentIdentifier, aggregator)

  // override harvest calls, so that no network calls are made
  pvtAgg.scheduler.harvest.send = function () {
    return {}
  }

  // prevent prepareHarvest from clearing timings
  pvtAgg.prepareHarvest = function () {
    return {}
  }

  // drain adds `timing` and `lcp` event listeners in the agent/timings module
  drain(agentIdentifier, 'feature')

  pvtAgg.cls = 1
  pvtAgg.addTiming('lcp', 1, { size: 1, startTime: 1 })
  pvtAgg.cls = 2

  var timing = find(pvtAgg.timings, function (t) {
    return t.name === 'lcp'
  })

  t.equal(timing.attrs.cls, 1, 'CLS value should be the one present at the time LCP happened')

  t.end()
})

function find (arr, fn) {
  if (arr.find) {
    return arr.find(fn)
  }
  var match = null
  arr.forEach(function (t) {
    if (fn(t)) {
      match = t
    }
  })
  return match
}
