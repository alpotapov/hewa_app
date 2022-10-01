import testGuidsRepository from "../repository/testGuids";

const validateGuid = (guid) => {
  return true;
}

const handleGuidInput = async (guid) => {
  // return codes:
  // - 0 : ok
  // - 1 : entry already exists
  // - 2 : saving error
  console.log('saving guid', guid);

  // const isValid = validateGuid(guid);

  const result = await testGuidsRepository.save(guid);

  return result;
}

export default {
  handleGuidInput,
}