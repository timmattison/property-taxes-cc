import React, { FC } from 'react'
import PropTypes from 'prop-types'
import { Scrollbar } from './scrollbar'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableRow from '@mui/material/TableRow'
import { SeverityPill, SeverityPillColor } from './severity-pill'
import { PropertyBasicDetailsProps } from '../sections/property/property-details'
import { toCurrency } from '../data/shared'
import { sortBy } from 'lodash'

interface PropertyTaxDetailListProps {
  propertyDetails: PropertyBasicDetailsProps
}

const negativePillColor = 'warning'
const positivePillColor = 'success'
const negativeColor = 'red'
const positiveColor = 'green'

function taxBreakdown(details: PropertyBasicDetailsProps) {
  const output = []

  let allTaxes = details.allTaxes ?? []

  allTaxes = sortBy(allTaxes, function (o) {
    return -o.calculatedValue
  })

  let counter = 0

  for (const tax of allTaxes) {
    if (tax.calculatedValue == 0) {
      continue
    }

    let severityPillColor: SeverityPillColor
    let severityColor

    if (tax.calculatedValue < 0) {
      severityPillColor = positivePillColor
      severityColor = positiveColor
    } else {
      severityPillColor = negativePillColor
      severityColor = negativeColor
    }

    output.push(
      <TableRow key={tax.note + counter}>
        <TableCell>
          <SeverityPill color={severityPillColor}>{tax.note}</SeverityPill>
        </TableCell>
        <TableCell>
          <Typography color={severityColor} variant="subtitle2">
            {toCurrency(tax.calculatedValue)}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle2">{tax.explanation}</Typography>
          <Typography variant="subtitle2">{tax.formula}</Typography>
        </TableCell>
      </TableRow>,
    )
  }

  if (output.length > 0) {
    output.unshift(
      <TableRow key="breakdown">
        <TableCell>
          <Typography variant="subtitle2">Tax breakdown</Typography>
        </TableCell>
      </TableRow>,
    )

    counter++
  }

  return output
}

export const PropertyTaxDetailList: FC<PropertyTaxDetailListProps> = (
  props: PropertyTaxDetailListProps,
) => {
  let counter = 0

  const names =
    props.propertyDetails.currentOwnersName?.map((name) => {
      return (
        <Typography
          key={props.propertyDetails.topParcelId + '-names-' + counter++}
          color="text.secondary"
          variant="body2"
        >
          {name}
        </Typography>
      )
    }) ?? []

  let location = <>{props.propertyDetails.propertyLocation}</>

  if (
    props.propertyDetails.propertyLocation !== undefined &&
    props.propertyDetails.propertyLocation !== ''
  ) {
    const googleMapsUrl =
      'https://www.google.com/maps/place/' +
      props.propertyDetails.propertyLocation +
      ',Pleasantville,NY'

    location = (
      <a href={googleMapsUrl} target="_blank" rel="noreferrer">
        {location}
      </a>
    )
  }

  return (
    <Scrollbar>
      <Table key={props.propertyDetails.topParcelId}>
        <TableBody>
          <TableRow hover>
            <TableCell>
              <Typography variant="subtitle2">Owner&apos;s name(s)</Typography>
              {names}
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Location</Typography>
              <Typography color="text.secondary" variant="body2">
                {location}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Parcel ID</Typography>
              <Typography color="text.secondary" variant="body2">
                {props.propertyDetails.topParcelId}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2">Full market value</Typography>
              <Typography color="text.secondary" variant="body2">
                {toCurrency(props.propertyDetails.fullMarketValue)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Total taxes</Typography>
              <Typography color="text.secondary" variant="body2">
                {toCurrency(props.propertyDetails.totalTaxes)}
              </Typography>
            </TableCell>
            <TableCell>
              <div style={{ display: 'flex' }}>
                <div>
                  <Typography variant="subtitle2">
                    Village assessment
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {toCurrency(props.propertyDetails.totalVillageAssessment)}
                  </Typography>
                </div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                <div>
                  <Typography variant="subtitle2">Town assessment</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {toCurrency(props.propertyDetails.totalTownAssessment)}
                  </Typography>
                </div>
              </div>
            </TableCell>
          </TableRow>
          {taxBreakdown(props.propertyDetails)}
        </TableBody>
      </Table>
    </Scrollbar>
  )
}

PropertyTaxDetailList.propTypes = {
  propertyDetails: PropTypes.object.isRequired,
}
