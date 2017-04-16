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
  FORSEND : 1,/*待发货 未定*/
  SENDFORRESPONSE:1,/*发货待响应*/
  SENDREJECTED:2,/*发货被拒绝*/
  SENDED : 3,/*已发货*/
  RECEIVED:4,/*已送达*/

  /*仓储状态*/
  INFORRESPONSE:1,/*入库待响应*/
  FORIN:2,/*待入库*/
  ALREADYIN:3,/*已入库*/
  OUTFORRESPONSE:4,/*出库待响应*/
  FOROUT:5,/*待出库*/
  ALREADYOUT:6,/*已出库*/
}

export default constantData
