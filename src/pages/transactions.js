import React from 'react'

export default class Transactions extends React.Component {
  render() {
    return (
      <>
        <div className="p-5">
          <div className="mb-8">
            <h1 className="font-bolds text-gray-800 text-4xl">Transactions</h1>
          </div>
          <div>
            <table class="min-w-full divide-y divide-gray-200 shadow-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Merchant
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="https://assets.brandfetch.io/7385dc4227734ff.svg" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          Walmart
                        </div>
                        <div class="text-sm text-gray-500">
                          Groceries
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">Withdrawal</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    $85.60
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    Yesterday
                  </td>
                </tr>
                <tr>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" src="https://assets.brandfetch.io/c284fe2780fd431.svg" alt="" />
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          Spotify
                        </div>
                        <div class="text-sm text-gray-500">
                          Music Streaming
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">Withdrawal</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    $12.99
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    Yesterday
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </>
    )
  }
}
