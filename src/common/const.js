const constantData={
  NOMESSAGE:0,/*暂无信息*/

  /*订单交易状态*/
  UNCONFIRMED : 1,/*交易待卖方确认*/
  CONFIRMED : 2,/*交易卖方已确认*/

  /*应收款状态*/
  FORACCEPT : 21,/*应收账款承兑待签收*/
  ACCEPTED : 26,/*应收账款承兑已签收*/
  DISCOUNTED:41,/*应收账款贴现待签收*/
  CASHED:31,/*应收账款已兑付*/
  FINISH:1,/*应收账款已结清*/

  /*运单状态*/
  FORSEND : 0,/*待发货*/
  SENDFORRESPONSE:1,/*发货待响应*/
  SENDRED:2,/*已发货*/
  ARRIVED : 3,/*已送达*/
  REJECTED:4,/*发货被拒绝*/

  /*仓储状态*/
  INFORRESPONSE:1,/*入库待响应*/
  FORIN:2,/*待入库*/
  ALREADYIN:3,/*已入库*/
  OUTFORRESPONSE:4,/*出库待响应*/
  FOROUT:5,/*待出库*/
  ALREADYOUT:6,/*已出库*/

  /*仓单状态*/
  CANFLOW:1,/*可流转，所有已入库货品的仓单*/
  FROZEN:2,/*冻结中，所有待出库货品*/
  DISABLED:3,/*已失效，所有已出库货品*/
}

export default constantData
