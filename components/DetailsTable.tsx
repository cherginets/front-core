import {TableCell as MuiTableCell, Table, TableBody, TableRow, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {FC, Fragment, ReactNode} from "react";

type DetailsTableProps = {
  groups: {
    title?: string;
    rows: {
      title: ReactNode;
      value: ReactNode;
    }[];
  }[];
};

const TableCell = styled((p: any) => <MuiTableCell {...p} />)({
  padding: 8,
  "&.MuiTableCell-head": {
    width: "40%",
    fontSize: "14px",
    padding: 4,
    lineHeight: "16px",
  },
  '&.MuiTableCell-head[colspan="2"]': {
    padding: 4,
    fontSize: "14px",
    lineHeight: "16px",
  },
});

const DetailsTable: FC<DetailsTableProps> = ({groups}) => {
  return (
    <Table>
      <TableBody>
        {groups.map((group, i) => {
          return (
            <Fragment key={i}>
              {!!group.title && (
                <TableRow>
                  <TableCell variant={"head"} colSpan={2}>
                    <Typography variant={"h6"}>{group.title}</Typography>
                  </TableCell>
                </TableRow>
              )}

              {group.rows.map((row, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell variant={"head"} align={"right"}>
                      <Typography variant={"subtitle2"} style={{maxWidth: 250}}>
                        {row.title}
                      </Typography>
                    </TableCell>
                    <TableCell variant={"body"} align={"left"}>
                      {row.value}
                    </TableCell>
                  </TableRow>
                );
              })}
            </Fragment>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DetailsTable;
