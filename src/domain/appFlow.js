import testGuidsDomain from "../repository/testGuids";

const shouldGoToFirstFlow = async () => {
  const guidCount = await testGuidsDomain.count();
  return guidCount === 0;
}

export default {
  shouldGoToFirstFlow,
}