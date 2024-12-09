import { prismaMock } from "../setup_test/singleton";
import { getUser } from "../setup_test/function";

test('should return an array of users', async () => {
    const sampleUsers = [
        {
          id: 1,
          firstname: "Jhon",
          lastname: "Doe",
          email: "jhondoe@gmail.com",
          createdAt: new Date(),
          updateAt: new Date()
        },
        {
          id: 2,
          firstname: "Jane",
          lastname: "Dine",
          email: "janedine@gmail.com",
          createdAt: new Date(),
          updateAt: new Date()
        },
      ];

      prismaMock.user.findMany.mockResolvedValue(sampleUsers)

      await expect(getUser()).resolves.toEqual(sampleUsers)
})