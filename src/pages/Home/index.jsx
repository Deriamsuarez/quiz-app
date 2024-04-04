import React, { useState } from "react";
import QuestionLayout from "@/layouts/QuestionLayout";

const index = () => {

const [count, setCount] = useState(1)

  
  return (
    <QuestionLayout title={'Multiple Choice'} setCount={setCount} count={count}>
      {count}
    </QuestionLayout>
  );
};

export default index;
