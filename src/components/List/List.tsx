import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';
import { Group, MoneyFlow, TimeRepeat } from '../../state/action-type';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useEffect } from 'react';
import AddTaskIcon from '@mui/icons-material/AddTask';

interface PropType {
  money_flow_prop: MoneyFlow | "all",
  group_prop: Group
}

export default function List(props: PropType) {

const { money_flow_prop, group_prop } = props;
const dispatch = useDispatch();
const { addMoney, deleteMoney } = bindActionCreators(actionCreators, dispatch);
// ------------ Data -----------------
const walletState = useSelector((state: RootState) => state.wallet)
const data = [...walletState.list];
const [select, setSelect] = React.useState<number[]>([]);

interface Data {
  id: number;
  name: string;
  money_input: number;
  time_now: number;
  time_set: number;
  time_repeat: TimeRepeat;
}
function createData(
  id: number,
  name: string,
  money_input: number,
  time_now: number,
  time_set: number,
  time_repeat: TimeRepeat,
): Data {
  return {
    id,
    name,
    money_input,
    time_now,
    time_set,
    time_repeat,
  };
}

const [rows, setRows] = React.useState<Data[]>([]);
useEffect(() => {
  let row : Data[] = [];
  data.map((item) => {
    if (
        (item.money_flow === (
            (money_flow_prop === "all") ? item.money_flow : money_flow_prop)
          ) && 
        (item.group === group_prop)
      )
    {
      let ite = createData(item.id, item.name, item.money_input, item.time_now, item.time_set, item.time_repeat);
      row.push(ite);
    }
  })
  setRows([...row])
}, [walletState])


// let row : Data[] = [];
// data.map((item) => {
//   if (
//       (item.money_flow === (
//           (money_flow_prop === "all") ? item.money_flow : money_flow_prop)
//         ) && 
//       (item.group === group_prop)
//     )
//   {
//     let ite = createData(item.id, item.name, item.money_input, item.time_now, item.time_set, item.time_repeat);
//     row.push(ite);
//   }
// })
// const [rows, setRows] = React.useState<Data[]>([...row]);
// ---------------------------------------------

// ----------------- So sánh -------------------
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
type Order = 'asc' | 'desc';
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
// ---------------------------------------------

// ---------------- Tiêu đề --------------------
interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  // id: 'number'
  label: string;
  numeric: boolean;
}
const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên khoản ',
  },
  {
    id: 'money_input',
    numeric: true,
    disablePadding: false,
    label: 'Số tiền',
  },
  {
    id: 'time_now',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian thêm',
  },
  {
    id: 'time_set',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian đến',
  },
  {
    id: 'time_repeat',
    numeric: true,
    disablePadding: false,
    label: 'Lặp lại',
  },
];
interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
// ---------------------------------------------

// --------------- Thanh công cụ của bảng ------------------
interface EnhancedTableToolbarProps {
  numSelected: number;
}
const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;

  const confirmList = () =>
  {
    console.log("succes");

    select.map((item) => 
    {
      data.map((task) =>
      {
        if (item === task.id)
        {
          let time_now = Date.now();
          let name = task.name + " " + behaviorTime(time_now);
          addMoney(
            task.money_flow,
            Group.IMMEDIATE,
            name,
            task.money_input,
            time_now,
            task.time_now,
            task.time_repeat,
            true,
            task.id_form,
          );
          if(group_prop === Group.FUTURE)
            deleteMoney(item);
          
        }
      })
    })

    setSelect([]);
    setSelected([]);
  }

  const deleteList = () =>
  {
    let rowsEx = [...rows];    
    select.map((item) => {
      rowsEx.forEach((row, index) =>
      {
        if(row.id === item)
        {
          rowsEx.splice(index, 1);
          deleteMoney(item);
        }
      })
    });
    // console.log(rowsEx);
    setRows([...rowsEx]);
    setSelect([]);
    setSelected([]);
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
      className="list_title"

    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
          className="list_title_change"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {group_prop}
        </Typography>
      )}
      {numSelected > 0 ? (
        <div className="list_task">
          {(group_prop !== Group.IMMEDIATE) ? 
          (
            <Tooltip title="Confirm" onClick={ () => confirmList()}>
            <IconButton>
              <AddTaskIcon />
            </IconButton>
          </Tooltip>
          )
          : null
        }
          <Tooltip title="Delete" onClick={ () => deleteList()}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
        
      ) : (
        null
        // <Tooltip title="Filter list">
        //   <IconButton>
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      )}
    </Toolbar>
  );
};
// ---------------------------------------------

// ------------------ Behavior -------------------

const behaviorMoney = (money: number) =>
{
  let money_str : string = "";
  let ship : number = 0;
  while (money > 0)
  {
    ship = money % 1000;
    // vì đây là dạng number nên kq không phải luôn luôn có dạng 3 chữ số
    // vì vậy ta pahri thêm số 0 bù vào cũng như thêm dấu .
    if (ship >= 100)
      money_str = ship.toString() + "." + money_str;
    else if(ship >= 10)
      money_str = "0" + ship.toString() + "." + money_str;
    else money_str = "00" + ship.toString() + "." + money_str;
    money = Math.floor(money / 1000);
  }
  // Loại bỏ các số 0 ở đầu
  for (let i = 1; i<=2; i++)
  {
    if (money_str.slice(0, 1) === "0")
      money_str = money_str.substring(1);
  }
  // Loại bỏ dấu chấm cuối
  money_str = money_str.substring(0, money_str.length - 1);
  return money_str;
}
const behaviorTime = (time: number) => 
{
  let timeDate = new Date(time);
  // console.log("list: timeDate: " + timeDate);
  let day = timeDate.getDate();
  let month = timeDate.getMonth() + 1;
  let year = timeDate.getFullYear();
  let hour = timeDate.getHours();
  let minute = timeDate.getMinutes();

  let money_str : string = hour.toString() + ":" + minute.toString() +
  "  " + day.toString() + "/" + month.toString() + "/" + year.toString();
  // console.log("list: " + money_str);
  return money_str;
}
const behaviorTimeRepeat = (time: TimeRepeat) =>
{
  switch(time)
  {
    case(TimeRepeat.NULL):
      return "-";
    case(TimeRepeat.DAY):
      return "1 ngày";
    case(TimeRepeat.WEEK):
      return "1 tuần";
    case(TimeRepeat.MONTH):
      return "1 tháng";
    case(TimeRepeat.QUARTER):
      return "1 quý";
    case(TimeRepeat.YEAR):
      return "1 năm";
    default:
      return "-";
  }
}

// -----------------------------------------------

// ------------------ Main -----------------------

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('money_input');
// ------------- Sắp xếp thứ tự mặc định ---------------
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    // old way
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
    // ---------

    // new way
    let array = [...select];
    let rowsEx = [...rows];
    if (array.length === rowsEx.length)
      setSelect([]);
    else 
    {
      setSelect([]);
      rowsEx.map((rowEx) => {
        setSelect((array) => [...array, rowEx.id]);
      })
    }

  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string, id: number) => {
    
    // old way
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
    // -------

    // new way
    // console.log(select + " " + id);

    let array = [...select];
    let index = array.indexOf(id);
    if (index === -1)
      setSelect([...array, id]);
    else 
    {
      array.splice(index, 1);
      setSelect([...array]);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      { (money_flow_prop === "all") ?
                      ( 
                        data.map((task) => {
                          if(task.id === row.id)
                            if(task.money_flow === MoneyFlow.MONEY_IN)
                              return( 
                                <TableCell align="right" className="list_green">
                                  {behaviorMoney(row.money_input)}
                                </TableCell>
                              )
                            else {
                              return(
                                <TableCell align="right" className="list_red">
                                  {behaviorMoney(row.money_input)}
                                </TableCell>
                              )
                              
                            }
                        })
                      
                      ) :
                      (
                        <TableCell align="right">
                          {behaviorMoney(row.money_input)}
                        </TableCell>
                      ) }
                      
                      <TableCell align="right">
                        {behaviorTime(row.time_now)}
                      </TableCell>
                      <TableCell align="right">
                        {behaviorTime(row.time_set)}
                      </TableCell>
                      <TableCell align="right">
                        {behaviorTimeRepeat(row.time_repeat)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Giảm khoảng trống"
        className="list_dense_padding"
      />
    </Box>
  );
} //---------- end
