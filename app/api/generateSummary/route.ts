import openai from '@/openai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  //todo in the body of the POST req
  const { todos } = await request.json()

  // console.log(todos)

  //communicate with open api GPT 3.5
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    n: 1,
    stream: false, //{"role": "user", "content": "Say this is a test!"}
    messages: [
      {
        role: 'system',
        content: `when responding, welcome the user always as Ms.Oumayma and say welcome 
                    to the ReactForce Todo App! Limit the response to 200 characters`,
      },
      {
        role: 'user',
        content: `Hi there, provide a summary of the following todo list. Count how many todos 
                    are in each category such as To do, in progress and done, then tell the user
                    to have a productive day! Here's the data: ${JSON.stringify(
                      todos
                    )}`,
      },
    ],
  })

  const { data } = response

  // console.log('DATA IS: ', data)
  // console.log(data.choices[0].message)

  return NextResponse.json(data.choices[0].message)
}
