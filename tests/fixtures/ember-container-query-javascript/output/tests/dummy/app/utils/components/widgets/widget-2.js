export const COLOR_PALETTE = {
  '8 - Track': '#5B8DB8',
  CD: '#EE7423',
  'CD Single': '#F59D3D',
  Cassette: '#7AAAD0',
  'Cassette Single': '#9BC7E4',
  'DVD Audio': '#9D7760',
  'Download Album': '#7C4D79',
  'Download Music Video': '#D5A5C4',
  'Download Single': '#9B6A97',
  Kiosk: '#E1575A',
  'LP/EP': '#2A5784',
  'Limited Tier Paid Subscription': '#B4E0A7',
  'Music Video (Physical)': '#F1CF63',
  'On-Demand Streaming (Ad-Supported)': '#398949',
  'Other Ad-Supported Streaming': '#61AA57',
  'Other Digital': '#EFC9E6',
  'Other Tapes': '#BADDF1',
  'Paid Subscription': '#24693D',
  'Ringtones & Ringbacks': '#BE89AC',
  SACD: '#FFC686',
  'SoundExchange Distributions': '#7DC470',
  Synchronization: '#BBB1AC',
  'Vinyl Single': '#43719F',
};

export function formatRevenue(revenue) {
  const formatter = new Intl.NumberFormat('en', {
    currency: 'USD',
    maximumFractionDigits: 1,
    style: 'currency',
  });

  if (revenue >= 1e12) {
    return `${formatter.format(revenue / 1e12)} trillion`;
  }

  if (revenue >= 1e9) {
    return `${formatter.format(revenue / 1e9)} billion`;
  }

  if (revenue >= 1e6) {
    return `${formatter.format(revenue / 1e6)} million`;
  }

  return `${new Intl.NumberFormat('en', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(revenue)}`;
}

/*
  Transform the raw data into something useful for visualization
*/
export function createDataForVisualization(rawData) {
  return rawData.map((datum) => {
    return {
      musicFormat: datum['Format'],
      revenue: datum['Revenue (Inflation Adjusted)'],
      year: datum['Year'],
    };
  });
}

/*
  Transform the raw data into something useful for captions
*/
export function createSummariesForCaptions(data) {
  const groupedData = groupDataByMusicFormat(data);
  const sanitizedData = sanitizeData(groupedData);
  const summaries = summarizeData(sanitizedData);

  return summaries;
}

function groupDataByMusicFormat(data) {
  return data.reduce((accumulator, datum) => {
    const { musicFormat, revenue, year } = datum;
    const didMusicFormatExist = revenue !== 0;

    if (accumulator[musicFormat]) {
      /* eslint-disable-next-line prefer-const */
      let { data, relevantYears } = accumulator[musicFormat];

      data.set(year, revenue);

      if (didMusicFormatExist) {
        relevantYears = {
          min: Math.min(year, relevantYears.min),
          max: Math.max(year, relevantYears.max),
        };
      }

      accumulator[musicFormat] = {
        data,
        relevantYears,
      };
    } else {
      accumulator[musicFormat] = {
        data: new Map([[year, revenue]]),
        relevantYears: {
          min: didMusicFormatExist ? year : Infinity,
          max: didMusicFormatExist ? year : -Infinity,
        },
      };
    }

    return accumulator;
  }, {});
}

function sanitizeData(groupedData) {
  const output = {};

  Object.keys(groupedData).forEach((musicFormat) => {
    const { data, relevantYears } = groupedData[musicFormat];
    const relevantData = new Map();

    // Remove data points outside of the relevant years
    for (let year = relevantYears.min; year <= relevantYears.max; year++) {
      const revenue = data.get(year);
      relevantData.set(year, revenue);
    }

    output[musicFormat] = {
      data: relevantData,
      relevantYears,
    };
  });

  return output;
}

function summarizeData(sanitizedData) {
  const summaries = [];

  Object.keys(sanitizedData)
    .sort()
    .forEach((musicFormat) => {
      const { data, relevantYears } = sanitizedData[musicFormat];
      const numRelevantYears = relevantYears.max - relevantYears.min + 1;

      const revenues = Array.from(data.values());
      const totalRevenue = revenues.reduce(
        (accumulator, sum) => accumulator + sum,
        0
      );
      const averageRevenue = totalRevenue / numRelevantYears;

      summaries.push({
        musicFormat,
        markerColor: COLOR_PALETTE[musicFormat],
        averageRevenue: formatRevenue(averageRevenue),
        relevantYears,
      });
    });

  return summaries;
}
