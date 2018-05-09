<?php

/**
 * Returns $var value if it is set and $velse otherwise
 * @param mixed $var input data value
 * @param mixed $velse return value if input var is missing
 * @return mixed
 */
function value ( & $var, $velse = null ) {
    if ( !isset($var) ) {
        return $velse;
    }

    return $var;
}

/**
 * Order the input array using one of the field as keys
 * @param array $data at least two-dimensional array
 * @param string $ordfld field to be used for ordering
 * @param string $valfld the only field to be taken from each row
 * @return array
 * @example call with $ordfld: 'id' and $data:
 *   [{id:1,type:5,data:11},{id:2,type:5,data:22},{id:3,type:6,data:33}]
 *   result: {1:{type:5,data:11},2:{type:5,data:22},3:{type:6,data:33}}
 * @example call with $ordfld: 'id', $valfld: 'data' and $data:
 *   [{id:1,type:5,data:11},{id:2,type:5,data:22},{id:3,type:6,data:33}]
 *   result: {1:11,2:22,3:33}
 */
function matrix_order ( $data, $ordfld, $valfld = null ) {
    $result = array();
    // check input and first array element to make sure ordfld field is present
    if ( $data && is_array($data) && $ordfld && ($cdata = current($data)) && isset($cdata[$ordfld]) ) {
        // convert the data to one-dimensional array
        if ( $valfld && isset($cdata[$valfld]) ) {
            foreach ( $data as $item )
                $result[$item[$ordfld]] = $item[$valfld];
        } else {
            foreach ( $data as $item ) {
                // reorganize each array element
                $key = $item[$ordfld];
                unset($item[$ordfld]);
                $result[$key] = $item;
            }
        }
    }

    return $result;
}

/**
 * Group the input array using one of the field as keys
 * if $ordfld not set then subarrays keys are preserved
 * auto reduce dimension if there are only 2 columns
 * @param array $data at least two-dimensional array
 * @param string $grpfld field to be used for grouping
 * @param string $ordfld additional ordering each subarray of grouped data
 * @param string $valfld the only field to be taken from each row on current level
 * @return array
 * @example call with $grpfld: 'type' and $data:
 *   [{id:1,type:5,data:11},{id:2,type:5,data:22},{id:3,type:6,data:33}]
 *   result: {5:[{id:1,data:11},{id:2,data:22}],6:{2:{id:3,data:33}}}
 * @example call with $grpfld: 'type', $ordfld: 'id' and $data:
 *   [{id:1,type:5,data:11},{id:2,type:5,data:22},{id:3,type:6,data:33}]
 *   result: {5:{1:{data:11},2:{data:22}},6:{3:{data:33}}}
 * @example call with $grpfld: 'type', $ordfld: 'id', $valfld: 'data' and $data:
 *   [{id:1,type:5,data:11},{id:2,type:5,data:22},{id:3,type:6,data:33}]
 *   result: {5:{1:11,2:22},6:{3:33}}
 * @example call with $grpfld: 'type' and $data:
 *   [{type:5,data:11},{type:5,data:22},{type:6,data:33}]
 *   result: {5:[11,22],6:[33]}
 */
function matrix_group ( $data, $grpfld, $ordfld = null, $valfld = null ) {
    $result = array();
    // check input and first row to make sure grpfld field is present and there are at least 2 columns
    if ( $data && is_array($data) && $grpfld && ($cdata = current($data)) && isset($cdata[$grpfld]) && count($cdata) >= 2 ) {
        // only 2 columns
        if ( count($cdata) == 2 ) {
            // determine the second column name by removing the first one
            unset($cdata[$grpfld]);
            $valfld = key($cdata);
            // 2 columns so group by first and
            // pack all values from the second into one array
            foreach ( $data as $key => $item ) {
                // append each array element to the corresponding group element
                $result[$item[$grpfld]][] = $item[$valfld];
            }
        } else {
            foreach ( $data as $key => $item ) {
                // place each array element in the corresponding group preserving keys
                $grp = $item[$grpfld];
                unset($item[$grpfld]);
                $result[$grp][] = $item;
            }
            // additional ordering
            if ( $ordfld )
                foreach ( $result as & $item )
                    // order each subarray by the ordfld
                    $item = matrix_order($item, $ordfld, $valfld);
        }
    }

    return $result;
}

/**
 * Slice the column of values from the data array
 * insert null if no cell with such key
 * @param array $data at least two-dimensional array
 * @param string $field name of the field to be extracted
 * @return array
 * @example $field: 'type' and $data:
 *   [{id:1,type:5,data:11},{id:2,type:5,data:22},{id:3,type:6,data:33},{id:4,data:44}]
 *   result: [5,5,6,null]
 */
function matrix_column ( $data, $field ) {
    $result = array();
    // check input data and field name
    if ( $data && is_array($data) && $field ) {
        foreach ( $data as $item ) {
            $result[] = value($item[$field]);
        }
    }

    return $result;
}

/**
 * Creates compacted arrays
 * replace key names with indexes and creates additional dictionary
 * @param array $data
 * @param array $defn
 * @return array
 */
function array_pack ( $data, $defn = array() ) {
    $result = array();
    $result['data'] = array();

    if ( $data && is_array($data) ) {
        foreach ( $data as $key => $value ) {
            $index = $key;
            if ( is_string($key)) {
                if ( isset($defn[$key]) ) {
                    $index = $defn[$key];
                } else {
                    $index = $defn[$key] = count($defn);
                }
            }
            if ( $value && is_array($value) ) {
                $value = array_pack($value, $defn);
                $defn  = $value['defn'];
                $value = $value['data'];
            }
            $result['data'][$index] = $value;
        }
    }

    $result['defn'] = $defn;

    return $result;
}
