#!/usr/bin/env bash

echo "{ \"printWidth\": 1000 }" > .prettierrc

npx prettier -w pleasantville-taxes.json

grep -v '^.*"cd":.*$' pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v currentOwnersStreetAddress pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v currentOwnersTown pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v currentOwnersState pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v currentOwnersZipCode pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v schoolDistrict pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v gridCoord pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v deed pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v parcelSize pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v landAssessment pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v taxableDistricts pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v account pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json
grep -v area pleasantville-taxes.json > x.json ; mv x.json pleasantville-taxes.json

npx prettier -w pleasantville-taxes.json

npx prettier -w mount-pleasant-taxes.json

grep -v '^.*"cd":.*$' mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v currentOwnersStreetAddress mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v currentOwnersTown mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v currentOwnersState mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v currentOwnersZipCode mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v schoolDistrict mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v gridCoord mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v deed mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v parcelSize mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v landAssessment mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v taxableDistricts mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v account mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json
grep -v area mount-pleasant-taxes.json > x.json ; mv x.json mount-pleasant-taxes.json

npx prettier -w mount-pleasant-taxes.json

rm .prettierrc
