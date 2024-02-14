import { useState, Fragment, MouseEvent } from 'react'
import { makeStyles } from 'tss-react/mui';

import {
  Menu,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Theme,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import type { Facet } from 'types'

type Props = {
  anchorEl: null | HTMLElement,
  setAnchorEl: Function,
  filterParam: string,
  facetValues: Facet[],
  applyFilter: Function,
  filterSelection?: string[]
}

const useStyles = makeStyles()((theme: Theme) =>
  ({
    facetList: {
      maxHeight: theme.spacing(50),
      overflow: 'auto',
      paddingLeft: 0
    }
  }));

const Filter = (props: Props) => {
  const {
    facetValues,
    filterParam,
    anchorEl,
    setAnchorEl,
    applyFilter,
    filterSelection = []
  } = props
  const { classes } = useStyles()

  const [selected, setSelected] = useState<string[]>([])

  const handleClick = ({ currentTarget }: MouseEvent<HTMLElement>) => {
    setSelected(filterSelection)
    setAnchorEl(currentTarget)
  }

  const handleSelect = (value: string) => {
    const index = selected.indexOf(String(value))
    const newSelection = index >= 0 ? selected.filter(a => a !== value): [...selected, String(value)]

    setSelected(newSelection)
  }

  const handleClose = () => setAnchorEl(null)

  return (
    <Fragment>
      <IconButton
        aria-label='filter'
        aria-haspopup='true'
        onClick={handleClick}
        size='small'
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ul className={classes.facetList}>
          {
            facetValues.map(({ label, value }) => (
              <MenuItem
                onClick={() => handleSelect(String(value))}
                dense
                key={label}
              >
                <ListItemIcon>
                  <Checkbox checked={selected.indexOf(String(value)) >= 0} />
                </ListItemIcon>
                <ListItemText primary={label} />
              </MenuItem>
            ))
          }
        </ul>
        <li>
          <Button disabled={!selected.length} onClick={() => setSelected([])}>
            Clear all
          </Button>
          <Button
            color='secondary'
            onClick={() => applyFilter(filterParam, selected)}
          >
            Apply
          </Button>
        </li>
      </Menu>
    </Fragment>
  );
}


export default Filter
