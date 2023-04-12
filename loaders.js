/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

module.exports = [
  { name: 'rum', features: [] }, // light loader
  { name: 'xhr', features: ['err', 'xhr'] },
  { name: 'stn', features: ['err', 'xhr', 'stn'] },
  { name: 'full', features: ['err', 'xhr', 'stn', 'ins'] }, // pro loader
  { name: 'dev', features: ['err', 'xhr', 'stn', 'ins', 'spa'], payload: 'dev' },
  { name: 'spa', features: ['err', 'xhr', 'stn', 'ins', 'spa'], payload: 'spa' },
  { name: 'spa-no-stn', features: ['err', 'xhr', 'ins', 'spa'], payload: 'spa' },
  { name: 'spa-no-xhr', features: ['err', 'stn', 'ins', 'spa'], payload: 'spa' },
  { name: 'spa-no-stn-no-xhr', features: ['err', 'ins', 'spa'], payload: 'spa' }
]
