// src/hooks/useLocationData.ts
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useOdoo } from "../contexts/OdooContext";
import { Country, setCountries } from "../stores/masterTables/CountryStore";
import { setStates, State } from "../stores/masterTables/StateStore";
import { useSnackbar } from "./SnackbarHook";
import { RootState } from "../../data/store/Store";
import {
  Organization,
  setOrganizations,
} from "../stores/masterTables/OrgsStore";
import {
  FieldOfStudy,
  setFieldsOfStudy,
} from "../stores/masterTables/FieldOfStudyStore";
import { Specialty, setSpecialty } from "../stores/masterTables/SpecialtyStore";
import {
  Authority,
  setAuthorities,
} from "../stores/masterTables/AuthorityStore";
import { Skill, setSkills } from "../stores/masterTables/SkillStore"; // Add this line

export const useLocationData = () => {
  const dispatch = useDispatch();
  const odoo = useOdoo();

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const tokenType = useSelector((state: RootState) => state.auth.tokenType);

  const headers = {
    Authorization: `${tokenType} ${accessToken}`,
  };

  const { showMessage } = useSnackbar();

  const fetchCountries = async () => {
    return await odoo?.get<Country[]>("res.country", {}, headers);
  };

  const fetchStates = async () => {
    return await odoo?.get<State[]>("res.country.state", {}, headers);
  };

  const fetchOrgs = async () => {
    return await odoo?.get<Organization[]>(
      "med.cruit.organization",
      {},
      headers
    );
  };

  const fetchFieldsOfStudy = async () => {
    return await odoo?.get<FieldOfStudy[]>(
      "med.cruit.field.of.study",
      {},
      headers
    );
  };

  const fetchSpecialties = async () => {
    return await odoo?.get<Specialty[]>("med.cruit.specialty", {}, headers);
  };

  const fetchAuthorities = async () => {
    return await odoo?.get<Authority[]>(
      "med.cruit.license.authority",
      {},
      headers
    );
  };

  const fetchSkills = async () => {
    return await odoo?.get<Skill[]>("med.cruit.skill", {}, headers);
  };

  const {
    data: countryData,
    error: countryError,
    refetch: refetchCountries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
    staleTime: 5 * 60 * 1000, // optional: customize stale time
  });

  const {
    data: stateData,
    error: stateError,
    refetch: refetchStates,
  } = useQuery({
    queryKey: ["states"],
    queryFn: fetchStates,
    staleTime: 5 * 60 * 1000, // optional: customize stale time
  });

  const {
    data: organizationData,
    error: organizationError,
    refetch: refetchOrgs,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrgs,
    staleTime: 5 * 60 * 1000, // optional: customize stale time
  });

  const {
    data: fieldOfStudyData,
    error: fieldOfStudyError,
    refetch: refetchFieldsOfStudy,
  } = useQuery({
    queryKey: ["fieldsOfStudy"],
    queryFn: fetchFieldsOfStudy,
    staleTime: 5 * 60 * 1000, // optional: customize stale time
  });

  const {
    data: specialtyData,
    error: specialtyError,
    refetch: refetchSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: fetchSpecialties,
    staleTime: 5 * 60 * 1000, // optional: customize stale time
  });

  const {
    data: authorityData,
    error: authorityError,
    refetch: refetchAuthorities,
  } = useQuery({
    queryKey: ["authorities"],
    queryFn: fetchAuthorities,
    staleTime: 5 * 60 * 1000, // optional: customize stale time
  });

  const {
    data: skillData,
    error: skillError,
    refetch: refetchSkills,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: fetchSkills,
    staleTime: 5 * 60 * 1000, // optional: customize stale time
  });

  useEffect(() => {
    if (countryData?.code === "success") {
      dispatch(setCountries(countryData.data));
    } else if (countryData?.code === "error") {
      showMessage(countryData.error?.message || "Unknown error", "error");
    } else if (countryError) {
      showMessage("Loading countries failed: " + countryError.message, "error");
    }
  }, [countryData, countryError, dispatch, showMessage]);

  useEffect(() => {
    if (stateData?.code === "success") {
      dispatch(setStates(stateData.data));
    } else if (stateData?.code === "error") {
      showMessage(stateData.error?.message || "Unknown error", "error");
    } else if (stateError) {
      showMessage("Loading states failed: " + stateError.message, "error");
    }
  }, [stateData, stateError, dispatch, showMessage]);

  useEffect(() => {
    if (organizationData?.code === "success") {
      dispatch(setOrganizations(organizationData.data));
    } else if (organizationData?.code === "error") {
      showMessage(organizationData.error?.message || "Unknown error", "error");
    } else if (organizationError) {
      showMessage(
        "Loading organizations failed: " + organizationError.message,
        "error"
      );
    }
  }, [organizationData, organizationError, dispatch, showMessage]);

  useEffect(() => {
    if (fieldOfStudyData?.code === "success") {
      dispatch(setFieldsOfStudy(fieldOfStudyData.data));
    } else if (fieldOfStudyData?.code === "error") {
      showMessage(fieldOfStudyData.error?.message || "Unknown error", "error");
    } else if (fieldOfStudyError) {
      showMessage(
        "Loading fields of study failed: " + fieldOfStudyError.message,
        "error"
      );
    }
  }, [fieldOfStudyData, fieldOfStudyError, dispatch, showMessage]);

  useEffect(() => {
    if (specialtyData?.code === "success") {
      dispatch(setSpecialty(specialtyData.data));
    } else if (specialtyData?.code === "error") {
      showMessage(specialtyData.error?.message || "Unknown error", "error");
    } else if (specialtyError) {
      showMessage(
        "Loading specialties failed: " + specialtyError.message,
        "error"
      );
    }
  }, [specialtyData, specialtyError, dispatch, showMessage]);

  useEffect(() => {
    if (authorityData?.code === "success") {
      dispatch(setAuthorities(authorityData.data));
    } else if (authorityData?.code === "error") {
      showMessage(authorityData.error?.message || "Unknown error", "error");
    } else if (authorityError) {
      showMessage(
        "Loading authorities failed: " + authorityError.message,
        "error"
      );
    }
  }, [authorityData, authorityError, dispatch, showMessage]);

  useEffect(() => {
    if (skillData?.code === "success") {
      dispatch(setSkills(skillData.data));
    } else if (skillData?.code === "error") {
      showMessage(skillData.error?.message || "Unknown error", "error");
    } else if (skillError) {
      showMessage("Loading skills failed: " + skillError.message, "error");
    }
  }, [skillData, skillError, dispatch, showMessage]);

  useEffect(() => {
    Promise.all([
      refetchFieldsOfStudy(),
      refetchSpecialties(),
      refetchAuthorities(),
      refetchSkills(),
      refetchCountries(),
      refetchStates(),
      refetchOrgs(),
    ]);
  }, [
    refetchCountries,
    refetchStates,
    refetchOrgs,
    refetchFieldsOfStudy,
    refetchSpecialties,
    refetchAuthorities,
    refetchSkills,
  ]);
};
