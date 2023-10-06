import { objectAssignDefined } from '@/utilities/objectAssignDefined'

describe('objectAssignDefined', () => {
  const getSampleObject = () => ({ a: 10, b: 20, c: undefined, d: null })

  describe('with only the target parameter', () => {
    it("doesn't change the target", () => {
      expect(objectAssignDefined(getSampleObject())).toEqual(getSampleObject())
    })
  })

  describe('with a source object', () => {
    it('merges the defined properties into the target', () => {
      expect(
        objectAssignDefined(getSampleObject(), {
          b: 30
        })
      ).toEqual({
        a: 10,
        b: 30,
        c: undefined,
        d: null
      })

      expect(
        objectAssignDefined(getSampleObject(), {
          a: undefined,
          b: 30,
          c: 10,
          d: undefined
        })
      ).toEqual({
        a: 10,
        b: 30,
        c: 10,
        d: null
      })

      expect(
        objectAssignDefined(getSampleObject(), {
          a: undefined,
          b: undefined
        })
      ).toEqual(getSampleObject())
    })
  })

  describe('with multiple source objects', () => {
    it('merges the defined properties from all sources (left to right) into the target', () => {
      expect(
        objectAssignDefined(
          getSampleObject(),
          {
            b: 30
          },
          {
            a: undefined,
            c: 10,
            e: undefined
          },
          {
            b: 40,
            e: 99,
            f: 100,
            g: undefined
          }
        )
      ).toEqual({
        a: 10,
        b: 40,
        c: 10,
        d: null,
        e: 99,
        f: 100
      })
    })
  })
})
